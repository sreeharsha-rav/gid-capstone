package app.doconnect.doconnect.security.controller;

import app.doconnect.doconnect.security.dto.AuthenticationRequest;
import app.doconnect.doconnect.security.dto.AuthenticationResponse;
import app.doconnect.doconnect.security.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtTokenUtil;

    /*
     * Method to create an authentication token
     * @param authenticationRequest - the authentication request
     * @param response - the HTTP response
     * @throws IOException
     * @throws BadCredentialsException
     * @throws DisabledException
     * @return void
     */
    @PostMapping("/authenticate")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws IOException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getName(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password", e);
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not created");
            return null;
        }
        // Get user details
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getName());
        // Generate token
        final String jwtToken = jwtTokenUtil.generateToken(userDetails.getUsername());

        return new AuthenticationResponse(jwtToken);
    }
}
