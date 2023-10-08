package com.uwb.clientserver.models.request;

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
public class OrganizationUnitRequest {
    private Long id;
    @Size(min = 2, max = 100)
    private String name;
    @NotNull(message = "The parent organization unit id is required.")
    private Long parentOrganizationUnitId;
    private String treePath;
}
