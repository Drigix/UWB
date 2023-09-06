package com.uwb.clientserver.services.impl;

import com.uwb.clientserver.exceptions.EmailAlreadyExistsException;
import com.uwb.clientserver.mappers.UserMapper;
import com.uwb.clientserver.models.Role;
import com.uwb.clientserver.models.User;
import com.uwb.clientserver.models.request.SignUpRequest;
import com.uwb.clientserver.models.request.SigninRequest;
import com.uwb.clientserver.models.response.JwtAuthenticationResponse;
import com.uwb.clientserver.repositories.RoleRepository;
import com.uwb.clientserver.repositories.UserRepository;
import com.uwb.clientserver.services.AuthenticationService;
import com.uwb.clientserver.services.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
        User user = userMapper.toEntity(request);
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
}
