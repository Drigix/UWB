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
public class UwbObjectIconRequest {
    private Long id;

    @NotEmpty(message = "The object icon name is required.")
    @Size(min = 2, max = 30)
    private String name;

    private String fileName;

    private Double fileSize;

    @NotNull(message = "The organizationUnitId is required.")
    private Long organizationUnitId;
}
