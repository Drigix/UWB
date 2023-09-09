package com.uwb.clientserver.models.request;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PasswordRequest {
    private String oldPassword;
    private String newPassword;
}
