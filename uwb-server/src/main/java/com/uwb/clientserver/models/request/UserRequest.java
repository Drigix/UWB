package com.uwb.clientserver.models.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
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
    @Size(min = 2, max = 20)
    private String firstName;
    @Size(min = 2, max = 30)
    private String lastName;
    @Size(min = 6, max = 50)
    private String email;
    private String theme;
    private String langKey;
    private List<Long> roleIds;
    private Long organizationUnitId;
}
