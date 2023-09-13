package com.uwb.clientserver.models.request;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrganizationUnitRequest {
    private Long id;
    private String name;
    private Long parentOrganizationUnitId;
    private String treePath;
}
