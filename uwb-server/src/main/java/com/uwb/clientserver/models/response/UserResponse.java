package com.uwb.clientserver.models.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String theme;

    private String langKey;

    private List<RoleResponse> roles;

    private Long organizationUnitId;
}
