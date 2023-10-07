package com.uwb.clientserver.models.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BackgroundRequest {
    private Long id;
    @NotEmpty(message = "The background name is required.")
    @Size(min = 2, max = 50)
    private String name;
    private String fileName;
    private Double fileSize;
    @NotNull(message = "The background scale is required.")
    private Double scale;
    @NotNull(message = "The organization-unit ID for background is required.")
    private Double organizationUnitId;
}
