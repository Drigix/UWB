package com.uwb.clientserver.services;

import com.uwb.clientserver.models.request.SignUpRequest;
import com.uwb.clientserver.models.request.SigninRequest;
import com.uwb.clientserver.models.response.JwtAuthenticationResponse;

public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SigninRequest request);
}
