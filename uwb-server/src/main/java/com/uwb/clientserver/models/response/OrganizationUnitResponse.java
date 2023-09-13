package com.uwb.clientserver.models.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrganizationUnitResponse {
    private Long id;
    private String name;
    private Long parentOrganizationUnitId;
    private String treePath;
}
