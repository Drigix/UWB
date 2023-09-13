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
public class OrganizationUnitTreeResponse {
    private OrganizationUnitResponse data;
    private List<OrganizationUnitTreeResponse> children;
}
