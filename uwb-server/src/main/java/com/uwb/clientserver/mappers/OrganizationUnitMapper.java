package com.uwb.clientserver.mappers;

import com.uwb.clientserver.models.OrganizationUnit;
import com.uwb.clientserver.models.User;
import com.uwb.clientserver.models.request.OrganizationUnitRequest;
import com.uwb.clientserver.models.response.OrganizationUnitResponse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {})
public interface OrganizationUnitMapper {

    OrganizationUnit toEntity(OrganizationUnitRequest request);

    OrganizationUnitResponse toResponse(OrganizationUnit organizationUnit);

    List<OrganizationUnitResponse> toResponseList(List<OrganizationUnit> organizationUnits);

    default OrganizationUnit fromId (Long id) {
        if (id == null) {
            return null;
        }
        return OrganizationUnit.builder().id(id).build();
    }
    default Long mapOrganizationUnitToId(OrganizationUnit organizationUnit) {
        return organizationUnit != null ? organizationUnit.getId() : null;
    }

    default OrganizationUnit toNewEntity(OrganizationUnitRequest request) {
        OrganizationUnit organizationUnit = toEntity(request);
        organizationUnit.setDeleted(false);
        return organizationUnit;
    }
}
