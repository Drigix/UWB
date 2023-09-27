package com.uwb.clientserver.mappers.area;

import com.uwb.clientserver.mappers.EntityMapper;
import com.uwb.clientserver.models.area.AreaVertex;
import com.uwb.clientserver.models.request.area.AreaVertexRequest;
import com.uwb.clientserver.models.response.area.AreaVertexResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = { AreaMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AreaVertexMapper extends EntityMapper<AreaVertexRequest, AreaVertex, AreaVertexResponse> {

    @Mapping(source = "areaId", target = "area")
    AreaVertex toEntity(AreaVertexRequest request);

    @Mapping(source = "area", target = "areaId")
    AreaVertexResponse toResponse(AreaVertex areaVertex);

    default AreaVertex fromId (Long id) {
        if (id == null) {
            return null;
        }
        return AreaVertex.builder().id(id).build();
    }
}
