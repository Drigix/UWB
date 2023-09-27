package com.uwb.clientserver.mappers;

import com.uwb.clientserver.models.Background;
import com.uwb.clientserver.models.request.BackgroundRequest;
import com.uwb.clientserver.models.response.BackgroundResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", uses = { OrganizationUnitMapper.class }, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BackgroundMapper extends EntityMapper<BackgroundRequest, Background, BackgroundResponse> {

    @Mapping(source = "organizationUnitId", target = "organizationUnit")
    Background toEntity(BackgroundRequest request);

    @Mapping(source = "organizationUnit", target = "organizationUnitId")
    BackgroundResponse toResponse(Background background);

    default Background fromId (Long id) {
        if (id == null) {
            return null;
        }
        return Background.builder().id(id).build();
    }

    default Long mapBackgroundToBackgroundId(Background background) {
        return background != null ? background.getId() : null;
    }
}
