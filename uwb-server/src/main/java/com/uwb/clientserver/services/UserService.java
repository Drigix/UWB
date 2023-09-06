package com.uwb.clientserver.services;

import com.uwb.clientserver.models.response.UserResponse;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {
    UserDetailsService userDetailsService();

    List<UserResponse> findAll();

    UserResponse findCurrentUser();
}
