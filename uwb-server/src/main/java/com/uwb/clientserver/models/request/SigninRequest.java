package com.uwb.clientserver.models.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SigninRequest {
    @NotEmpty(message = "The email is required.")
    private String email;
    @NotEmpty(message = "The email is required.")
    private String password;
}
