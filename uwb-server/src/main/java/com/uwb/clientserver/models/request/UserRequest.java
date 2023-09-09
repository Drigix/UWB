package com.uwb.clientserver.models.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserRequest {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String theme;
    private String langKey;
    private List<Long> roleIds;
}
