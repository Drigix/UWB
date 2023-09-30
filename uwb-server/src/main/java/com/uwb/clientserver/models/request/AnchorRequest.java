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
public class AnchorRequest {
    private Long id;

    @NotEmpty(message = "The object name is required.")
    @Size(min = 2, max = 30)
    private String name;

    private Double x;

    private Double y;

    private Double z;

    @NotNull(message = "The background id on anchor is required.")
    private Long backgroundId;
}
