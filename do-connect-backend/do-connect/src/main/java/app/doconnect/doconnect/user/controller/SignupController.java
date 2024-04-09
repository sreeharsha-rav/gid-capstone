package app.doconnect.doconnect.user.controller;

import app.doconnect.doconnect.user.dto.SignupRequest;
import app.doconnect.doconnect.user.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import app.doconnect.doconnect.user.service.UserService;

/*
 * Controller class to define the REST API endpoint for the Signup service
 * createUser - to create a new user
 */
@RestController
@RequestMapping("/signup")
public class SignupController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody(required = true) SignupRequest signupRequest) {
        // Check if user already exists
        if (userService.hasUserWithName(signupRequest.getName())) {
            return new ResponseEntity<>("User already exists with given name: " + signupRequest.getName(), HttpStatus.BAD_REQUEST);
        }
        if (userService.hasUserWithEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("User already exists with given email: " + signupRequest.getEmail(), HttpStatus.BAD_REQUEST);
        }

        // Create a new user
        UserDTO createdUser = userService.createUser(signupRequest);
        if (createdUser == null) {
            return new ResponseEntity<>("User creation failed", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        }
    }

}
