package com.uwb.clientserver.mappers.object;

import com.uwb.clientserver.models.OrganizationUnit;
import com.uwb.clientserver.models.object.UwbObjectIcon;
import com.uwb.clientserver.models.request.object.UwbObjectIconRequest;
import com.uwb.clientserver.models.response.object.UwbObjectIconResponse;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UwbObjectIconMapper {

    UwbObjectIcon toEntity(UwbObjectIconRequest request);

    UwbObjectIconResponse toResponse(UwbObjectIcon uwbObjectIcon);

    List<UwbObjectIconResponse> toResponseList(List<UwbObjectIcon> uwbObjectIcons);

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
