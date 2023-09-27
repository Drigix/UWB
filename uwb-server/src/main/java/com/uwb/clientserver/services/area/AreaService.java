package com.uwb.clientserver.services.area;

import com.uwb.clientserver.models.request.area.AreaRequest;
import com.uwb.clientserver.models.response.area.AreaResponse;

import java.util.List;

public interface AreaService {

    AreaResponse create(AreaRequest request);

    List<AreaResponse> findAll();

    List<AreaResponse> findAllByBackground(Long id);

    AreaResponse update(AreaRequest request);

    void delete(Long id);

    void deleteList(List<Long> ids);
}
