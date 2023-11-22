package com.uwb.clientserver.services;

import com.uwb.clientserver.models.request.OrganizationUnitRequest;
import com.uwb.clientserver.models.response.OrganizationUnitResponse;
import com.uwb.clientserver.models.response.OrganizationUnitTreeResponse;

import java.util.List;

public interface OrganizationUnitService {

    OrganizationUnitResponse create(OrganizationUnitRequest request);

    List<OrganizationUnitResponse> findAll();

    List<OrganizationUnitTreeResponse> findTree();

    OrganizationUnitResponse findOneById(Long id);

    OrganizationUnitResponse update(OrganizationUnitRequest request);

    void delete(Long id);
}
