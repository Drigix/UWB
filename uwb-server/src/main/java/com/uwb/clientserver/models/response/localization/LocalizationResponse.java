package com.uwb.clientserver.models.response.localization;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.ZonedDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LocalizationResponse {
    private Long id;
    private ZonedDateTime date;
    private Double x;
    private Double y;
    private Double z;
    private String tagId;
    private Long backgroundId;
    private String anchorIds;
    private byte[] pathArrayBuffer;
}
