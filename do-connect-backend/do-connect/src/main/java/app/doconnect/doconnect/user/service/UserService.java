package app.doconnect.doconnect.user.service;

import app.doconnect.doconnect.user.dto.SignupRequest;
import app.doconnect.doconnect.user.dto.UserDTO;

public interface UserService {
    UserDTO createUser(SignupRequest signupRequest);

    boolean hasUserWithName(String name);

    boolean hasUserWithEmail(String email);
}
