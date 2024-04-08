package app.doconnect.doconnect.security.service;

import app.doconnect.doconnect.user.repository.UserRepository;
import app.doconnect.doconnect.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

/*
 * Service class to implement the methods for the User service
 * loadUserByUsername - to load a user by its username
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /*
     * Method to load a user by its username
     * @param username - the username of the user
     * @throws UsernameNotFoundException
     * @return UserDetails
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // logic to get user from database
        Optional<User> userOptional = userRepository.findFirstByName(username);
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("User not found with name: " +  username);
        }
        // return the user details
        return new org.springframework.security.core.userdetails.User(userOptional.get().getName(), userOptional.get().getPassword(), new ArrayList<>());
    }

}
