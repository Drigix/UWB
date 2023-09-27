package com.uwb.clientserver.services.area;

import com.uwb.clientserver.models.request.area.AreaTypeRequest;
import com.uwb.clientserver.models.response.area.AreaTypeResponse;

import java.util.List;

public interface AreaTypeService {
    
    AreaTypeResponse create(AreaTypeRequest request);

    List<AreaTypeResponse> findAll();

    List<AreaTypeResponse> findAllByOrganization(Long id);

    AreaTypeResponse update(AreaTypeRequest request);

    void delete(Long id);

    void deleteList(List<Long> ids);
}
