package app.doconnect.doconnect.user.service;

import app.doconnect.doconnect.user.dto.SignupRequest;
import app.doconnect.doconnect.user.dto.UserDTO;
import app.doconnect.doconnect.user.dto.UserResponse;
import app.doconnect.doconnect.user.entity.User;
import app.doconnect.doconnect.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/*
 * This class implements the UserService interface and provides the implementation for the methods.
 * createUser - to create a new user
 * hasUserWithName - to check if a user with the given name exists
 * hasUserWithEmail - to check if a user with the given email exists
 * getUserById - to get a user by their id
 */
@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean hasUserWithName(String name) {
        return userRepository.findFirstByName(name).isPresent();
    }

    @Override
    public boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public UserDTO createUser(SignupRequest signupRequest) {
        User user = new User();
        user.setName(signupRequest.getName());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        User createdUser = userRepository.save(user);
        UserDTO createdUserDTO = new UserDTO();
        createdUserDTO.setId(createdUser.getId());
        createdUserDTO.setName(createdUser.getName());
        createdUserDTO.setEmail(createdUser.getEmail());
        return createdUserDTO;
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<UserResponse> getUserDetailsById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Create a new UserResponse object and set the values
            UserResponse userResponse = new UserResponse();
            userResponse.setId(user.getId());
            userResponse.setName(user.getName());
            return Optional.of(userResponse);
        }
        return null;
    }

}
