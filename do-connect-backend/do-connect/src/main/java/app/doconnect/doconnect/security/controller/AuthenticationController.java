package app.doconnect.doconnect.security.controller;

import app.doconnect.doconnect.security.dto.AuthenticationRequest;
import app.doconnect.doconnect.security.dto.AuthenticationResponse;
import app.doconnect.doconnect.security.util.JwtUtil;
import app.doconnect.doconnect.user.entity.User;
import app.doconnect.doconnect.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONException;
import org.json.JSONObject;
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
import java.util.Optional;

/*
 * Controller class to define the REST API endpoints for the Authentication service
 * createAuthenticationToken - to create an authentication token
 */
@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepositorty;

    @Autowired
    private JwtUtil jwtTokenUtil;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    /*
     * Method to create an authentication token
     * @param authenticationRequest - the authentication request
     * @param response - the HTTP response
     * @throws IOException
     * @throws JSONException
     * @return void
     */
    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) throws IOException, JSONException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getName(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password", e);
        } catch (DisabledException disabledException) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "User is not created");
        }
        // Get user details
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getName());
        Optional<User> optionalUser = userRepositorty.findFirstByName(userDetails.getUsername());
        // Generate token
        final String jwtToken = jwtTokenUtil.generateToken(userDetails.getUsername());
        // Add user details to response
        if (optionalUser.isPresent()) {
            response.getWriter().write(new JSONObject()
                        .put("userId", optionalUser.get().getId())
                        .put("name", optionalUser.get().getName())
                        .toString());
        }
        // Add token to response with authorization header
        response.addHeader("Access-Control-Expose-Headers", "Authorization");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
        response.setHeader(HEADER_STRING, TOKEN_PREFIX + jwtToken);
    }
}
