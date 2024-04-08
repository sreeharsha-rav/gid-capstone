package app.doconnect.doconnect.user.service;

import app.doconnect.doconnect.user.dto.SignupDTO;
import app.doconnect.doconnect.user.dto.UserDTO;

public interface UserService {
    UserDTO createUser(SignupDTO signupDTO);
}
