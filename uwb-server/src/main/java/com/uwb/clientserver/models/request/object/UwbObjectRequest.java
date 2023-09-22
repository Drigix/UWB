package com.uwb.clientserver.models.request.object;

import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UwbObjectRequest {
    private Long id;

    @NotEmpty(message = "The object name is required.")
    @Size(min = 2, max = 30)
    private String name;

    @NotEmpty(message = "The object second name is required.")
    @Size(min = 2, max = 30)
    private String secondName;

    @NotEmpty(message = "The object hexTagId name is required.")
    @Size(min = 2, max = 20)
    private String hexTagId;

    @NotNull(message = "The object type id is required.")
    private Long uwbObjectTypeId;
}
