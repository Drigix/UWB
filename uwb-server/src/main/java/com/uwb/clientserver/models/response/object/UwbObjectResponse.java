package com.uwb.clientserver.models.response.object;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UwbObjectResponse {
    private Long id;
    private String name;
    private String secondName;
    private String fullName;
    private String hexTagId;
    private UwbObjectTypeResponse uwbObjectType;
}
