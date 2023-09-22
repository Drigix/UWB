package com.uwb.clientserver.models.response.object;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UwbObjectTypeResponse {
    private Long id;
    private String name;
    private Boolean adminOnly;
    private Long organizationUnitId;
    private UwbObjectIconResponse uwbObjectIcon;
}
