package com.uwb.clientserver.services;

import com.uwb.clientserver.models.request.PasswordRequest;
import com.uwb.clientserver.models.request.UserRequest;
import com.uwb.clientserver.models.response.UserResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {

    UserDetailsService userDetailsService();

    List<UserResponse> findAll();

    List<UserResponse> findAllByOrganization(Long id);

    UserResponse findCurrentUser();

    UserResponse update(UserRequest request);

    void delete(Long id);
}
