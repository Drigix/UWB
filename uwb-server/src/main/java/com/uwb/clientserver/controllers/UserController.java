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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import static com.uwb.clientserver.security.AuthoritiesConstants.*;
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
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<JwtAuthenticationResponse> signup(@Valid @RequestBody SignUpRequest request) throws MethodArgumentNotValidException  {
        logger.info("Request to signup new user: {}", request);
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    /**
     * Endpoint for find all users in the application.
     *
     * @return list of UserResponse.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<UserResponse> getAllUsers() {
        logger.info("Request to get all users");
        return userService.findAll();
    }

    /**
     * Endpoint for get current user.
     *
     * @return entity of UserResponse.
     */
    @GetMapping("/account")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public UserResponse getCurrentUser() {
        logger.info("Request to get current user.");
        return userService.findCurrentUser();
    }

    /**
     * Endpoint for update user.
     *
     * @return entity of UserResponse.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public UserResponse updateUser(@RequestBody UserRequest request) {
        logger.info("Request to update user.");
        return userService.update(request);
    }

    /**
     * Endpoint for delete user.
     *
     * @param id The id of user.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        logger.info("Request to delete user: {}.", id);
        userService.delete(id);
        return ResponseEntity.ok("User has been deleted!");
    }

}
