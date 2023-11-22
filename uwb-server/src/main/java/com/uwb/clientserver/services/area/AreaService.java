package com.uwb.clientserver.services.area;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.uwb.clientserver.models.area.Area;
import com.uwb.clientserver.models.area.AreaVertex;
import com.uwb.clientserver.models.request.area.AreaRequest;
import com.uwb.clientserver.models.response.area.AreaResponse;

import java.util.List;

public interface AreaService {

    AreaResponse create(AreaRequest request);

    List<AreaResponse> findAll();

    Area findOneEntityById(Long id);

    List<AreaResponse> findAllByBackground(Long id);

    List<AreaResponse> findAllByOrganizationUnit(Long id);

    AreaResponse update(AreaRequest request);

    void delete(Long id);

    void deleteList(List<Long> ids);

    void checkIfEnterOrExitArea(String tagId, Long backgroundId, Double x, Double y) throws JsonProcessingException;

    boolean isPointInsideArea(Double backgroundScale, Double x, Double y, List<AreaVertex> vertexes);
}
