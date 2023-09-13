package com.uwb.clientserver.models.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SignUpRequest {
    @NotEmpty(message = "The name is required.")
    private String firstName;
    @NotEmpty(message = "The lastName is required.")
    private String lastName;
    @NotEmpty(message = "The email is required.")
    private String email;
    @NotEmpty(message = "The password is required.")
    private String password;
    @NotEmpty(message = "Role or roles is required.")
    private List<Long> roleIds;
    @NotNull(message = "The organizationUnitId is required.")
    private Long organizationUnitId;
}
