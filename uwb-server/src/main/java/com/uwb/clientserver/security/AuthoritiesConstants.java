package com.uwb.clientserver.security;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public final class AuthoritiesConstants {

    public static final String ADMIN = "ADMIN";

    public static final String USER = "USER";

    public static final String ADMIN_PREAUTHORIZE = "hasAnyAuthority('" + ADMIN + "')";

    public static final String LOGGED_USER_PREAUTHORIZE = "hasAnyAuthority('" + ADMIN + "','" + USER + "')";
}
