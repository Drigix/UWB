package com.uwb.clientserver.models.request.area;

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
public class AreaTypeRequest {
    private Long id;

    @NotEmpty(message = "The area name is required.")
    @Size(min = 2, max = 50)
    private String name;

    @NotEmpty(message = "The area color is required.")
    @Size(min = 5, max = 10)
    private String color;

    @NotNull(message = "The organization unit ID in area type is required.")
    private Long organizationUnitId;
}
