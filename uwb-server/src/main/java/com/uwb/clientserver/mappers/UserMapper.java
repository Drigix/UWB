package com.uwb.clientserver.mappers;

import com.uwb.clientserver.models.Role;
import com.uwb.clientserver.models.User;
import com.uwb.clientserver.models.request.SignUpRequest;
import com.uwb.clientserver.models.request.SigninRequest;
import com.uwb.clientserver.models.request.UserRequest;
import com.uwb.clientserver.models.response.JwtAuthenticationResponse;
import com.uwb.clientserver.models.response.UserResponse;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = { RoleMapper.class, OrganizationUnitMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    @Mapping(source = "roleIds", target = "roles")
    @Mapping(source = "organizationUnitId", target = "organizationUnit")
    User toEntity(SignUpRequest request);

    User toEntity(SigninRequest request);

    @Mapping(source = "roleIds", target = "roles")
    @Mapping(source = "organizationUnitId", target = "organizationUnit")
    User toEntity(UserRequest request);

    @Mapping(source = "roles", target = "roles")
    @Mapping(source = "organizationUnit", target = "organizationUnitId")
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

    default User toEntityWithDefaultThemeAndLang(SignUpRequest request) {
        User user = toEntity(request);
        if(user.getTheme() == null) {
            user.setTheme("primaryTheme");
        }
        if(user.getLangKey() == null) {
            user.setLangKey("pl");
        }
        return user;
    }

}
