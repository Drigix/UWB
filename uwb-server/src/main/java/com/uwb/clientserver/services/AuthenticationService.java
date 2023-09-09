package com.uwb.clientserver.services;

import com.uwb.clientserver.models.request.PasswordRequest;
import com.uwb.clientserver.models.request.SignUpRequest;
import com.uwb.clientserver.models.request.SigninRequest;
import com.uwb.clientserver.models.response.JwtAuthenticationResponse;
import com.uwb.clientserver.models.response.UserResponse;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SigninRequest request);

    UserResponse updatePassword(PasswordRequest request);
}
