import com.majorProject.RecruitmentAndSkillTrainingPlatform.config.AppProperties;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.entity.Role;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.security.JwtTokenProvider;
import com.majorProject.RecruitmentAndSkillTrainingPlatform.security.UserDetailsImpl;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
public class Probe {
  public static void main(String[] args) {
    AppProperties props = new AppProperties();
    props.setSecret("VGhpcyBJcyBBIFJlYWxseSBTdHJvbmcgSldUIEtleSBGb3IgUmVjcnVpdG1lbnQgUGxhdGZvcm0gMjAyNiE=");
    props.setExpirationMs(86400000);
    JwtTokenProvider provider = new JwtTokenProvider(props);
    UserDetailsImpl principal = new UserDetailsImpl(1L, "admin@example.com", "pw", Role.ADMIN);
    Authentication auth = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    String jwt = provider.generateToken(auth);
    System.out.println(jwt);
    System.out.println(provider.validateToken(jwt));
    System.out.println(provider.getUsernameFromJWT(jwt));
  }
}
