package app.doconnect.doconnect.user.dto;

import lombok.Data;

/*
 * This class is a data transfer object that is used to transfer the data from the server to the client.
 * id - The id of the user.
 * name - The name of the user.
 */
@Data
public class UserResponse {
    private Long id;
    private String name;
}
