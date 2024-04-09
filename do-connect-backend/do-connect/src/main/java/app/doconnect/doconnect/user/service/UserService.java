package app.doconnect.doconnect.user.service;

import app.doconnect.doconnect.user.dto.SignupRequest;
import app.doconnect.doconnect.user.dto.UserDTO;

/*
 * This interface provides the methods to be implemented by the UserServiceImpl class.
 * createUser - to create a new user
 * hasUserWithName - to check if a user with the given name exists
 * hasUserWithEmail - to check if a user with the given email exists
 */
public interface UserService {
    UserDTO createUser(SignupRequest signupRequest);

    boolean hasUserWithName(String name);

    boolean hasUserWithEmail(String email);
}
