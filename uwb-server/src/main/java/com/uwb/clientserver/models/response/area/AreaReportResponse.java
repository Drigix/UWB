package com.uwb.clientserver.models.response.area;

import com.uwb.clientserver.models.response.localization.LocalizationResponse;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AreaReportResponse {
    private Long id;
    private String areaName;
    private List<LocalizationResponse> localizations;
}
