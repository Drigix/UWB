package com.uwb.clientserver.mappers.object;

import com.uwb.clientserver.models.object.UwbObject;
import com.uwb.clientserver.models.request.object.UwbObjectRequest;
import com.uwb.clientserver.models.response.object.UwbObjectResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = { UwbObjectTypeMapper.class })
public interface UwbObjectMapper {

    @Mapping(source = "uwbObjectTypeId", target = "uwbObjectType")
    UwbObject toEntity(UwbObjectRequest request);

    @Mapping(source = "uwbObjectType", target = "uwbObjectType")
    UwbObjectResponse toResponse(UwbObject UwbObject);

    List<UwbObjectResponse> toResponseList(List<UwbObject> UwbObjects);

    default UwbObject fromId (Long id) {
        if (id == null) {
            return null;
        }
        return UwbObject.builder().id(id).build();
    }
}
