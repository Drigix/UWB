package com.uwb.clientserver.services.impl;

import com.uwb.clientserver.exceptions.BadPasswordException;
import com.uwb.clientserver.exceptions.EmailAlreadyExistsException;
import com.uwb.clientserver.mappers.UserMapper;
import com.uwb.clientserver.models.Role;
import com.uwb.clientserver.models.User;
import com.uwb.clientserver.models.request.PasswordRequest;
import com.uwb.clientserver.models.request.SignUpRequest;
import com.uwb.clientserver.models.request.SigninRequest;
import com.uwb.clientserver.models.response.JwtAuthenticationResponse;
import com.uwb.clientserver.models.response.UserResponse;
import com.uwb.clientserver.repositories.RoleRepository;
import com.uwb.clientserver.repositories.UserRepository;
import com.uwb.clientserver.services.AuthenticationService;
import com.uwb.clientserver.services.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserMapper userMapper;

    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException();
        }
        request.setPassword(passwordEncoder.encode(request.getPassword()));
        User user = userMapper.toEntityWithDefaultThemeAndLang(request);
        user = userRepository.save(user);
        List<Role> userRoles = roleRepository.findByUsersId(user.getId());
        user.setRoles(userRoles);
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password."));
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public UserResponse updatePassword(PasswordRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(auth.getName(), request.getOldPassword()));
        User user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user = userRepository.save(user);
        return userMapper.toResponse(user);
    }
}
