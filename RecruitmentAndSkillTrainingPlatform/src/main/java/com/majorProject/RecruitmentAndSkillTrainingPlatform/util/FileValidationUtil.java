package com.majorProject.RecruitmentAndSkillTrainingPlatform.util;

import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public final class FileValidationUtil {

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    private FileValidationUtil() {
    }

    public static void validateResume(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Resume file is required.");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("Resume file size must be less than 5MB.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Unsupported file type. Only PDF and DOC/DOCX are allowed.");
        }

        String originalName = file.getOriginalFilename();
        if (originalName == null || originalName.contains("..") || originalName.contains("/") || originalName.contains("\\")) {
            throw new IllegalArgumentException("Invalid file name.");
        }
    }
}

