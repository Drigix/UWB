package com.uwb.clientserver.services.impl;

import com.uwb.clientserver.exceptions.BadPasswordException;
import com.uwb.clientserver.exceptions.ItemNotExistException;
import com.uwb.clientserver.mappers.UserMapper;
import com.uwb.clientserver.models.User;
import com.uwb.clientserver.models.request.PasswordRequest;
import com.uwb.clientserver.models.request.UserRequest;
import com.uwb.clientserver.models.response.UserResponse;
import com.uwb.clientserver.repositories.UserRepository;
import com.uwb.clientserver.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    @Override
    public List<UserResponse> findAll() {
        return userMapper.toResponseList(userRepository.findAllByDeletedFalse());
    }

    @Override
    public UserResponse findCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return userMapper.toResponse(user);
    }

    @Override
    public UserResponse update(UserRequest request) {
        User user = userMapper.toEntity(request);
        User existUser = userRepository.findById(user.getId()).orElseThrow(() -> new ItemNotExistException(user.getId()));
        User userToSave = setMissingValues(user, existUser);
        return userMapper.toResponse(userRepository.save(userToSave));
    }

    @Override
    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ItemNotExistException(id));
        user.setDeleted(true);
        userRepository.save(user);
    }

    private User setMissingValues(User request, User userData) {
        request.setCreatedBy(userData.getCreatedBy());
        request.setCreatedDate(userData.getCreatedDate());
        request.setPassword(userData.getPassword());
        if(request.getLangKey() == null) {
            request.setLangKey(userData.getLangKey());
        }
        if(request.getTheme() == null) {
            request.setTheme(userData.getTheme());
        }
        return request;
    }
}
