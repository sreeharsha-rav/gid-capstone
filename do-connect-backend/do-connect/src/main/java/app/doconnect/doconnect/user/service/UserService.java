package app.doconnect.doconnect.user.service;

import app.doconnect.doconnect.user.dto.SignupRequest;
import app.doconnect.doconnect.user.dto.UserDTO;
import app.doconnect.doconnect.user.dto.UserResponse;
import app.doconnect.doconnect.user.entity.User;

import java.util.Optional;

/*
 * This interface provides the methods to be implemented by the UserServiceImpl class.
 * createUser - to create a new user
 * hasUserWithName - to check if a user with the given name exists
 * hasUserWithEmail - to check if a user with the given email exists
 * getUserById - to get a user by their id
 */
public interface UserService {
    UserDTO createUser(SignupRequest signupRequest);

    boolean hasUserWithName(String name);

    boolean hasUserWithEmail(String email);
    Optional<User> findById(Long id);
    Optional<UserResponse> getUserDetailsById(Long id);
}
