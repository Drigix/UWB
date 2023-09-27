package com.uwb.clientserver.mappers.object;

import com.uwb.clientserver.mappers.EntityMapper;
import com.uwb.clientserver.mappers.OrganizationUnitMapper;
import com.uwb.clientserver.models.object.UwbObjectType;
import com.uwb.clientserver.models.request.object.UwbObjectTypeRequest;
import com.uwb.clientserver.models.response.object.UwbObjectTypeResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", uses = { OrganizationUnitMapper.class, UwbObjectIconMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UwbObjectTypeMapper extends EntityMapper<UwbObjectTypeRequest, UwbObjectType, UwbObjectTypeResponse> {

    @Mapping(source = "organizationUnitId", target = "organizationUnit")
    @Mapping(source = "uwbObjectIconId", target = "uwbObjectIcon")
    UwbObjectType toEntity(UwbObjectTypeRequest request);

    @Mapping(source = "organizationUnit", target = "organizationUnitId")
    @Mapping(source = "uwbObjectIcon", target = "uwbObjectIcon")
    UwbObjectTypeResponse toResponse(UwbObjectType UwbObjectType);

    default UwbObjectType fromId (Long id) {
        if (id == null) {
            return null;
        }
        return UwbObjectType.builder().id(id).build();
    }

    default Long mapUwbObjectTypeToId(UwbObjectType uwbObjectType) {
        return uwbObjectType != null ? uwbObjectType.getId() : null;
    }
}
