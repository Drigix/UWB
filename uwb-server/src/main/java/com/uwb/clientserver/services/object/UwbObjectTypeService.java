package com.uwb.clientserver.services.object;

import com.uwb.clientserver.models.request.object.UwbObjectTypeRequest;
import com.uwb.clientserver.models.response.object.UwbObjectTypeResponse;

import java.io.IOException;
import java.util.List;

public interface UwbObjectTypeService {
    UwbObjectTypeResponse create(UwbObjectTypeRequest request);

    List<UwbObjectTypeResponse> findAll();

    List<UwbObjectTypeResponse> findAllByOrganization(Long id) throws IOException;

    UwbObjectTypeResponse update(UwbObjectTypeRequest request);

    void delete(Long id);
}
