package app.doconnect.doconnect.user.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private Long id;
    private String name;
    private String email;
    private String password;
}
