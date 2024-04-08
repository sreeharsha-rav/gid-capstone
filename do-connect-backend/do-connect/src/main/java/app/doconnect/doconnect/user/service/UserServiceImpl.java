package app.doconnect.doconnect.user.service;

import app.doconnect.doconnect.user.dto.SignupDTO;
import app.doconnect.doconnect.user.dto.UserDTO;
import app.doconnect.doconnect.user.entity.User;
import app.doconnect.doconnect.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
    public UserDTO createUser(SignupDTO signupDTO) {
        User user = new User();
        user.setName(signupDTO.getName());
        user.setEmail(signupDTO.getEmail());
        user.setPassword(new BCryptPasswordEncoder().encode(signupDTO.getPassword()));
        User createdUser = userRepository.save(user);
        UserDTO createdUserDTO = new UserDTO();
        createdUserDTO.setId(createdUser.getId());
        createdUserDTO.setName(createdUser.getName());
        createdUserDTO.setEmail(createdUser.getEmail());
        return createdUserDTO;
    }
}
