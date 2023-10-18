package com.uwb.clientserver.mappers.object;

import com.uwb.clientserver.mappers.EntityMapper;
import com.uwb.clientserver.models.object.UwbObject;
import com.uwb.clientserver.models.request.object.UwbObjectRequest;
import com.uwb.clientserver.models.response.object.UwbObjectResponse;
import org.mapstruct.*;


@Mapper(componentModel = "spring", uses = { UwbObjectTypeMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UwbObjectMapper extends EntityMapper<UwbObjectRequest, UwbObject, UwbObjectResponse> {

    @Mapping(source = "uwbObjectTypeId", target = "uwbObjectType")
    UwbObject toEntity(UwbObjectRequest request);

    @Mapping(source = "uwbObjectType", target = "uwbObjectType")
    @Mapping(target = "fullName", expression = "java(uwbObject.getName() + ' ' + uwbObject.getSecondName())")
    UwbObjectResponse toResponse(UwbObject uwbObject);

    default UwbObject fromId (Long id) {
        if (id == null) {
            return null;
        }
        return UwbObject.builder().id(id).build();
    }
}
