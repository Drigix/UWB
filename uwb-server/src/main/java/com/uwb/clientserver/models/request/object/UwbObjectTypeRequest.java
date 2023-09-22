package com.uwb.clientserver.models.request.object;

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
public class UwbObjectTypeRequest {
    private Long id;

    @NotEmpty(message = "The object icon name is required.")
    @Size(min = 2, max = 50)
    private String name;

    private Boolean adminOnly;

    @NotNull(message = "The organizationUnitId is required.")
    private Long organizationUnitId;

    @NotNull(message = "The uwbObjectIconId is required.")
    private Long uwbObjectIconId;
}
