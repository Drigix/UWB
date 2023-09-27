package com.uwb.clientserver.services.area;

import com.uwb.clientserver.models.request.area.AreaVertexRequest;
import com.uwb.clientserver.models.response.area.AreaVertexResponse;

import java.util.List;

public interface AreaVertexService {
    
    AreaVertexResponse create(AreaVertexRequest request);

    List<AreaVertexResponse> createList(List<AreaVertexRequest> requests);

    List<AreaVertexResponse> findAll();

    List<AreaVertexResponse> findAllByBackground(Long id);

    List<AreaVertexResponse> findAllByArea(Long id);

    AreaVertexResponse update(AreaVertexRequest request);

    List<AreaVertexResponse> updateList(List<AreaVertexRequest> requests);

    void delete(Long id);

    void deleteList(List<Long> ids);
}
