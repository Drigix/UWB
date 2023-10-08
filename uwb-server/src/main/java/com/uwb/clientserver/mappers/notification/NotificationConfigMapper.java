package com.uwb.clientserver.mappers.notification;

import com.uwb.clientserver.mappers.EntityMapper;
import com.uwb.clientserver.mappers.area.AreaMapper;
import com.uwb.clientserver.models.area.Area;
import com.uwb.clientserver.models.notification.NotificationConfig;
import com.uwb.clientserver.models.request.notification.NotificationConfigRequest;
import com.uwb.clientserver.models.response.notification.NotificationConfigResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = { NotificationTypeMapper.class, AreaMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NotificationConfigMapper extends EntityMapper<NotificationConfigRequest, NotificationConfig, NotificationConfigResponse> {

    @Mapping(source = "areaIds", target = "areas")
    @Mapping(source = "notificationTypeId", target = "notificationType")
    NotificationConfig toEntity(NotificationConfigRequest request);

    @Mapping(source = "areas", target = "areaIds")
    @Mapping(source = "notificationType", target = "notificationTypeId")
    @Mapping(source = "areas", target = "organizationUnitId", qualifiedByName = "extractOrganizationUnitId")
    NotificationConfigResponse toResponse(NotificationConfig notificationConfig);

    @Named("extractOrganizationUnitId")
    default Long extractOrganizationUnitId(List<Area> areas) {
        if (areas != null && !areas.isEmpty() && areas.get(0).getBackground() != null) {
            return areas.get(0).getBackground().getOrganizationUnit().getId();
        }
        return null;
    }

    default NotificationConfig fromId (Long id) {
        if (id == null) {
            return null;
        }
        return NotificationConfig.builder().id(id).build();
    }
}
