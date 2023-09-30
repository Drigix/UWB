package com.uwb.clientserver.mappers;

import com.uwb.clientserver.models.Anchor;
import com.uwb.clientserver.models.request.AnchorRequest;
import com.uwb.clientserver.models.response.AnchorResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = { BackgroundMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnchorMapper extends EntityMapper<AnchorRequest, Anchor, AnchorResponse> {

    @Mapping(source = "backgroundId", target = "background")
    Anchor toEntity(AnchorRequest request);

    @Mapping(source = "XPx", target = "xPx")
    @Mapping(source = "YPx", target = "yPx")
    @Mapping(source = "background", target = "backgroundId")
    AnchorResponse toResponse(Anchor anchor);

    default Anchor fromId(Long id) {
        if (id == null) {
            return null;
        }
        return Anchor.builder().id(id).build();
    }

    default Long mapAnchorToId(Anchor anchor) {
        return anchor != null ? anchor.getId() : null;
    }
}
