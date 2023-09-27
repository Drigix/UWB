package com.uwb.clientserver.models.request.area;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AreaVertexRequest {
    private Long id;

    @NotNull(message = "The object type id is required.")
    private Integer lp;

    @NotNull(message = "The area vertex x coordinate is required.")
    private Double x;

    @NotNull(message = "The area vertex y coordinate is required.")
    private Double y;

    @NotNull(message = "The area ID in area vertex is required.")
    private Long areaId;
}
