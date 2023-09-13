package com.uwb.clientserver.controllers;

import com.uwb.clientserver.models.request.PasswordRequest;
import com.uwb.clientserver.models.request.SignUpRequest;
import com.uwb.clientserver.models.request.UserRequest;
import com.uwb.clientserver.models.response.JwtAuthenticationResponse;
import com.uwb.clientserver.models.response.UserResponse;
import com.uwb.clientserver.services.AuthenticationService;
import com.uwb.clientserver.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final AuthenticationService authenticationService;

    /**
     * Endpoint for user registration.
     *
     * @param request The request body containing user registration data.
     * @return ResponseEntity with a JWT authentication response upon successful registration or
     * @exception MethodArgumentNotValidException in case of validation errors
     */
    @PostMapping()
    public ResponseEntity<JwtAuthenticationResponse> signup(@Valid @RequestBody SignUpRequest request) throws MethodArgumentNotValidException  {
        logger.debug("Request to signup new user: {}", request);
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    /**
     * Endpoint for find all users in the application.
     *
     * @return list of UserResponse.
     */
    @GetMapping()
    public List<UserResponse> getAllUsers() {
        logger.debug("Request to get all users");
        return userService.findAll();
    }

    /**
     * Endpoint for get current user.
     *
     * @return entity of UserResponse.
     */
    @GetMapping("/account")
    public UserResponse getCurrentUser() {
        logger.debug("Request to get current user.");
        return userService.findCurrentUser();
    }

    /**
     * Endpoint for update user.
     *
     * @return entity of UserResponse.
     */
    @PutMapping()
    public UserResponse updateUser(@RequestBody UserRequest request) {
        logger.debug("Request to update user.");
        return userService.update(request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        logger.debug("Request to delete user: {}.", id);
        userService.delete(id);
        return ResponseEntity.ok("User has been deleted!");
    }

}
