package com.uwb.clientserver.models.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.jetbrains.annotations.NotNull;

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

    private List<Long> roleIds;
}
