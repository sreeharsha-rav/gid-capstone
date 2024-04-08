package app.doconnect.doconnect.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationRequest {
    private String name;
    private String password;
}
