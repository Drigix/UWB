package com.uwb.clientserver.controllers;

import com.uwb.clientserver.models.request.PasswordRequest;
import com.uwb.clientserver.models.request.SignUpRequest;
import com.uwb.clientserver.models.request.SigninRequest;
import com.uwb.clientserver.models.response.JwtAuthenticationResponse;
import com.uwb.clientserver.models.response.UserResponse;
import com.uwb.clientserver.services.AuthenticationService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import static com.uwb.clientserver.security.AuthoritiesConstants.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/uwb/authentication")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {
    private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
    private final AuthenticationService authenticationService;

    /**
     * Endpoint for user registration.
     *
     * @param request The request body containing user registration data.
     * @return ResponseEntity with a JWT authentication response upon successful registration or
     * @exception MethodArgumentNotValidException in case of validation errors
     */
    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@Valid @RequestBody SignUpRequest request) throws MethodArgumentNotValidException  {
        logger.debug("Request to signup new user: {}", request);
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    /**
     * Endpoint for user registration.
     *
     * @param request The request body containing user login data.
     * @return ResponseEntity with a JWT authentication response upon successful login
     * @exception MethodArgumentNotValidException in case of validation errors
     */
    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@Valid @RequestBody SigninRequest request) throws MethodArgumentNotValidException {
        logger.debug("Request to signin user with email: {}", request.getEmail());
        return ResponseEntity.ok(authenticationService.signin(request));
    }

    /**
     * Endpoint for update user password.
     *
     * @return entity of UserResponse.
     */
    @PutMapping("/password")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public UserResponse updateUserPassword(@RequestBody PasswordRequest request) {
        logger.debug("Request to update user password.");
        return authenticationService.updatePassword(request);
    }
}
