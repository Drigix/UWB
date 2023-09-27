package com.uwb.clientserver.mappers.area;

import com.uwb.clientserver.mappers.BackgroundMapper;
import com.uwb.clientserver.mappers.EntityMapper;
import com.uwb.clientserver.models.area.Area;
import com.uwb.clientserver.models.request.area.AreaRequest;
import com.uwb.clientserver.models.response.area.AreaResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = { AreaTypeMapper.class, BackgroundMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AreaMapper extends EntityMapper<AreaRequest, Area, AreaResponse> {

    @Mapping(source = "areaTypeId", target = "areaType")
    @Mapping(source = "backgroundId", target = "background")
    Area toEntity(AreaRequest request);

    @Mapping(source = "areaType", target = "areaType")
    @Mapping(source = "background", target = "backgroundId")
    AreaResponse toResponse(Area area);


    default Area fromId (Long id) {
        if (id == null) {
            return null;
        }
        return Area.builder().id(id).build();
    }

    default Long mapAreaToAreaId(Area area) {
        return area != null ? area.getId() : null;
    }
}
