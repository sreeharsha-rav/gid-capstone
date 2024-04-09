package app.doconnect.doconnect.user.dto;

import lombok.Data;

/*
 * This class is a data transfer object that is used to transfer the data from the client to the server.
 * id - The id of the user.
 * name - The name of the user.
 * email - The email of the user.
 * password - The password of the user.
 */
@Data
public class SignupRequest {
    private Long id;
    private String name;
    private String email;
    private String password;
}
