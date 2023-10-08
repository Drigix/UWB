package com.uwb.clientserver.mappers.notification;

import com.uwb.clientserver.models.notification.NotificationType;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NotificationTypeMapper {

    default NotificationType fromId (Long id) {
        if (id == null) {
            return null;
        }
        return NotificationType.builder().id(id).build();
    }

    default Long mapToId(NotificationType notificationType) {
        return notificationType != null ? notificationType.getId() : null;
    }
}
