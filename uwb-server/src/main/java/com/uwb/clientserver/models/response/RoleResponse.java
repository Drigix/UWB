package com.uwb.clientserver.models.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RoleResponse {
    private Long id;
    private String name;
}
