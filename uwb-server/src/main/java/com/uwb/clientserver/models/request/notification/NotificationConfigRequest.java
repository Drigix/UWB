package com.uwb.clientserver.models.request.notification;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class NotificationConfigRequest {
    private Long id;

    @Size(min = 2, max = 50)
    private String title;

    @Size(max = 300)
    private String message;

    @NotEmpty(message = "The area id on notification config is required.")
    private List<Long> areaIds;

    @NotNull(message = "The notification type id on notification config is required.")
    private Long notificationTypeId;
}
