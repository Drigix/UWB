package com.uwb.clientserver.services.impl.area;

import com.uwb.clientserver.mappers.area.AreaVertexMapper;
import com.uwb.clientserver.models.area.AreaVertex;
import com.uwb.clientserver.models.request.area.AreaVertexRequest;
import com.uwb.clientserver.models.response.area.AreaVertexResponse;
import com.uwb.clientserver.repositories.area.AreaVertexRepository;
import com.uwb.clientserver.services.area.AreaVertexService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AreaVertexServiceImpl implements AreaVertexService {
    private final AreaVertexMapper areaVertexMapper;
    private final AreaVertexRepository areaVertexRepository;

    @Override
    public AreaVertexResponse create(AreaVertexRequest request) {
        AreaVertex areaVertex = areaVertexMapper.toEntity(request);
        return areaVertexMapper.toResponse(areaVertexRepository.save(areaVertex));
    }

    @Override
    public List<AreaVertexResponse> createList(List<AreaVertexRequest> requests) {
        List<AreaVertexResponse> responses = new ArrayList<>();
        for(AreaVertexRequest request: requests) {
            responses.add(create(request));
        }
        return responses;
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaVertexResponse> findAll() {
        return areaVertexMapper.toResponseList(areaVertexRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaVertexResponse> findAllByBackground(Long id) {
//        List<AreaVertex> temp = areaVertexRepository.findAllByBackgroundId(id);
        return areaVertexMapper.toResponseList(areaVertexRepository.findAllByAreaBackgroundId(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaVertexResponse> findAllByArea(Long id) {
        return areaVertexMapper.toResponseList(areaVertexRepository.findAllByAreaId(id));
    }

    @Override
    public AreaVertexResponse update(AreaVertexRequest request) {
        AreaVertex areaVertex = areaVertexMapper.toEntity(request);
        return areaVertexMapper.toResponse(areaVertexRepository.save(areaVertex));
    }

    @Override
    public List<AreaVertexResponse> updateList(List<AreaVertexRequest> requests) {
        List<AreaVertexResponse> responses = new ArrayList<>();
        for(AreaVertexRequest request: requests) {
            responses.add(update(request));
        }
        return responses;
    }

    @Override
    public void delete(Long id) {
        areaVertexRepository.deleteById(id);
    }

    @Override
    public void deleteList(List<Long> ids) {
        for(Long id: ids) {
            delete(id);
        }
    }
}
