package com.uwb.clientserver.mappers;

import com.uwb.clientserver.models.Role;
import com.uwb.clientserver.models.User;
import com.uwb.clientserver.models.request.SignUpRequest;
import com.uwb.clientserver.models.request.SigninRequest;
import com.uwb.clientserver.models.response.JwtAuthenticationResponse;
import com.uwb.clientserver.models.response.UserResponse;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = { RoleMapper.class })
public interface UserMapper {

    @Mapping(source = "roleIds", target = "roles")
    User toEntity(SignUpRequest request);

    User toEntity(SigninRequest request);

    @Mapping(source = "roles", target = "roles")
    UserResponse toResponse(User user);

    List<UserResponse> toResponseList(List<User> users);

    default User fromId (Long id) {
        if (id == null) {
            return null;
        }
        User user = User.builder().build();
        User.builder().id(id);
        return user;
    }
}
