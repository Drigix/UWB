package com.uwb.clientserver.services.object;

import com.uwb.clientserver.models.request.object.UwbObjectRequest;
import com.uwb.clientserver.models.response.object.UwbObjectResponse;

import java.io.IOException;
import java.util.List;

public interface UwbObjectService {
    
    UwbObjectResponse create(UwbObjectRequest request);

    List<UwbObjectResponse> findAll();

    List<UwbObjectResponse> findAllByOrganization(Long id) throws IOException;

    UwbObjectResponse update(UwbObjectRequest request);

    void delete(Long id);

    void deleteList(List<Long> ids);
}
