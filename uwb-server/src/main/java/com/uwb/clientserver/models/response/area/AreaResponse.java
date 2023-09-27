package com.uwb.clientserver.models.response.area;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AreaResponse {
    private Long id;
    private String name;
    private String color;
    private AreaTypeResponse areaType;
    private Long backgroundId;
}
