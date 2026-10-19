package com.majorProject.RecruitmentAndSkillTrainingPlatform.service.impl;

import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.JobEntity;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.repository.JobRepository;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.service.JobCrawlingService;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Queue;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class JobCrawlingServiceImpl implements JobCrawlingService {

    private static final List<String> JOB_KEYWORDS = List.of(
            "job", "jobs", "hiring", "recruitment", "vacancy", "vacancies",
            "developer", "internship", "career", "placement", "apply", "company",
            "opportunity", "engineer", "clerk", "lawyer", "ca", "accountant"
    );

    private final JobRepository jobRepository;

    @Override
    public void crawlSeedLinks() {
        Queue<String> queue = new ArrayDeque<>();
        Set<String> visited = new HashSet<>();
        List<String> seeds = getAllowedSeedLinks();

        for (String seed : seeds) {
            queue.add(seed);
        }

        while (!queue.isEmpty()) {
            String url = queue.poll();
            if (url == null || !isAllowedDomain(url) || !visited.add(normalizeUrl(url))) {
                continue;
            }

            try {
                Document document = Jsoup.connect(url)
                        .userAgent("Mozilla/5.0")
                        .timeout(5000)
                        .get();

                String text = document.text().toLowerCase(Locale.ROOT);
                boolean isLikelyJobPage = containsJobKeyword(text);

                if (!isLikelyJobPage) {
                    continue;
                }

                List<String> linkedUrls = new ArrayList<>();
                Elements links = document.select("a[href]");
                for (Element link : links) {
                    String href = link.attr("abs:href");
                    if (href != null && !href.isBlank()) {
                        linkedUrls.add(href);
                    }
                }

                for (String linkedUrl : linkedUrls) {
                    String normalized = normalizeUrl(linkedUrl);
                    if (normalized != null && !normalized.isBlank() && !visited.contains(normalized) && isAllowedDomain(normalized)) {
                        queue.add(normalized);
                    }
                }

                JobEntity job = extractJobFromDocument(document, url);
                if (job != null) {
                    saveJobIfMissing(job);
                }
            } catch (IOException ignored) {
                // Ignore unreachable/blocked pages during crawling.
            }
        }
    }

    @Override
    public List<String> getAllowedSeedLinks() {
        return List.of(
                "https://www.ncs.gov.in/",
                "https://www.scholarships.com/",
                "https://www.linkedin.com/jobs/",
                "https://www.w3.org/",
                "https://www.microsoft.com/en-us/jobs/"
        );
    }

    private boolean containsJobKeyword(String text) {
        for (String keyword : JOB_KEYWORDS) {
            if (text.contains(keyword)) {
                return true;
            }
        }
        return false;
    }

    private boolean isAllowedDomain(String url) {
        try {
            String host = new URI(url).getHost();
            if (host == null) {
                return false;
            }
            String lowerHost = host.toLowerCase(Locale.ROOT);
            return lowerHost.contains("ncs.gov.in")
                    || lowerHost.contains("linkedin.com")
                    || lowerHost.contains("microsoft.com")
                    || lowerHost.contains("scholarships.com")
                    || lowerHost.contains("w3.org");
        } catch (URISyntaxException e) {
            return false;
        }
    }

    private String normalizeUrl(String url) {
        if (url == null || url.isBlank()) {
            return null;
        }
        try {
            URI uri = new URI(url);
            return uri.normalize().toString().replaceAll("#.*$", "");
        } catch (URISyntaxException e) {
            return url;
        }
    }

    private JobEntity extractJobFromDocument(Document document, String url) {
        String title = document.title();
        String text = document.text();
        if (title == null || title.isBlank() || !containsJobKeyword(text.toLowerCase(Locale.ROOT))) {
            return null;
        }

        String description = document.select("meta[name=description]").attr("content");
        if (description == null || description.isBlank()) {
            description = text.length() > 1500 ? text.substring(0, 1500) : text;
        }

        String relatedTo = inferRole(text);

        return JobEntity.builder()
                .title(title.length() > 200 ? title.substring(0, 200) : title)
                .link(url)
                .description(description)
                .deadline(LocalDate.now().plusDays(30))
                .eligibility("Eligibility inferred from page content")
                .relatedTo(relatedTo)
                .source("crawler")
                .active(true)
                .build();
    }

    private String inferRole(String text) {
        String lower = text.toLowerCase(Locale.ROOT);
        if (lower.contains("developer") || lower.contains("software")) return "developer";
        if (lower.contains("lawyer") || lower.contains("legal")) return "lawyer";
        if (lower.contains("accountant") || lower.contains("ca")) return "ca";
        if (lower.contains("clerk") || lower.contains("office")) return "clerk";
        return "general";
    }

    private void saveJobIfMissing(JobEntity job) {
        boolean exists = jobRepository.findAll().stream()
                .anyMatch(existing -> existing.getLink().equalsIgnoreCase(job.getLink())
                        || existing.getTitle().equalsIgnoreCase(job.getTitle()));
        if (!exists) {
            jobRepository.save(job);
        }
    }
}
