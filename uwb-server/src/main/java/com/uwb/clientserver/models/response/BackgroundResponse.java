package com.uwb.clientserver.models.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BackgroundResponse {
    private Long id;
    private String name;
    private byte[] pathArrayBuffer;
    private Double scale;
    private Long organizationUnitId;
}
