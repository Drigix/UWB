package com.uwb.clientserver.mappers.area;

import com.uwb.clientserver.mappers.OrganizationUnitMapper;
import com.uwb.clientserver.models.area.AreaType;
import com.uwb.clientserver.models.request.area.AreaTypeRequest;
import com.uwb.clientserver.models.response.area.AreaTypeResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = { OrganizationUnitMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AreaTypeMapper {

    @Mapping(source = "organizationUnitId", target = "organizationUnit")
    AreaType toEntity(AreaTypeRequest request);

    @Mapping(source = "organizationUnit", target = "organizationUnitId")
    AreaTypeResponse toResponse(AreaType area);

    List<AreaTypeResponse> toResponseList(List<AreaType> areas);

    default AreaType fromId (Long id) {
        if (id == null) {
            return null;
        }
        return AreaType.builder().id(id).build();
    }
}
