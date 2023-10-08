package com.uwb.clientserver.models.response.notification;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NotificationConfigResponse {
    private Long id;
    private String title;
    private String message;
    private List<Long> areaIds;
    private Long notificationTypeId;
    private Long organizationUnitId;
}
