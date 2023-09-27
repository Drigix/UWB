package com.uwb.clientserver.mappers;

import com.uwb.clientserver.models.OrganizationUnit;
import com.uwb.clientserver.models.User;
import com.uwb.clientserver.models.request.OrganizationUnitRequest;
import com.uwb.clientserver.models.response.OrganizationUnitResponse;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", uses = {}, unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrganizationUnitMapper extends EntityMapper<OrganizationUnitRequest, OrganizationUnit, OrganizationUnitResponse> {


    default OrganizationUnit fromId (Long id) {
        if (id == null) {
            return null;
        }
        return OrganizationUnit.builder().id(id).build();
    }
    default Long mapOrganizationUnitToId(OrganizationUnit organizationUnit) {
        return organizationUnit != null ? organizationUnit.getId() : null;
    }
}
