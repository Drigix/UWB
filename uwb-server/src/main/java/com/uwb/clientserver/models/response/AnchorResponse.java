package com.uwb.clientserver.models.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AnchorResponse {
    private Long id;
    private String name;
    private Double x;
    private Double y;
    private Double z;
    @JsonProperty("xPx")
    private Double xPx;
    @JsonProperty("yPx")
    private Double yPx;
    private Long backgroundId;
}
