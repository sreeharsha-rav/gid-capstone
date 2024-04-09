package app.doconnect.doconnect.security.dto;

import lombok.Getter;
import lombok.Setter;

/*
 * This class is used to receive the user credentials from the client.
 * name: username
 * password: password
 */
@Getter
@Setter
public class AuthenticationRequest {
    private String name;
    private String password;
}
