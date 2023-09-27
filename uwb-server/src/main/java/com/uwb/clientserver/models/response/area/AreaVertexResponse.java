package com.uwb.clientserver.models.response.area;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AreaVertexResponse {
    private Long id;
    private Integer lp;
    private Double x;
    private Double y;
    private Long areaId;
}
