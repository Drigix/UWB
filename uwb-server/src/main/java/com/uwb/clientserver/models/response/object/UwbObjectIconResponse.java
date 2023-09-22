package com.uwb.clientserver.models.response.object;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UwbObjectIconResponse {
    private Long id;
    private String name;
    private byte[] pathArrayBuffer;
    private Long organizationUnitId;
}
