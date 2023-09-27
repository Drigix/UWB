package com.uwb.clientserver.mappers;

import com.uwb.clientserver.models.Background;
import com.uwb.clientserver.models.OrganizationUnit;
import com.uwb.clientserver.models.request.BackgroundRequest;
import com.uwb.clientserver.models.response.BackgroundResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = { OrganizationUnitMapper.class })
public interface BackgroundMapper {

    @Mapping(source = "organizationUnitId", target = "organizationUnit")
    Background toEntity(BackgroundRequest request);

    @Mapping(source = "organizationUnit", target = "organizationUnitId")
    BackgroundResponse toResponse(Background background);

    List<BackgroundResponse> toResponseList(List<Background> backgrounds);
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
