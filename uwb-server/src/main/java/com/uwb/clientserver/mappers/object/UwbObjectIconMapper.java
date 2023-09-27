package com.uwb.clientserver.mappers.object;

import com.uwb.clientserver.mappers.EntityMapper;
import com.uwb.clientserver.models.object.UwbObjectIcon;
import com.uwb.clientserver.models.request.object.UwbObjectIconRequest;
import com.uwb.clientserver.models.response.object.UwbObjectIconResponse;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UwbObjectIconMapper extends EntityMapper<UwbObjectIconRequest, UwbObjectIcon, UwbObjectIconResponse> {

    default UwbObjectIcon fromId (Long id) {
        if (id == null) {
            return null;
        }
        return UwbObjectIcon.builder().id(id).build();
    }

    default Long mapUwbObjectIconToId(UwbObjectIcon uwbObjectIcon) {
        return uwbObjectIcon != null ? uwbObjectIcon.getId() : null;
    }
}
