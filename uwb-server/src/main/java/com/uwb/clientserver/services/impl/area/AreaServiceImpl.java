package com.uwb.clientserver.services.impl.area;

import com.uwb.clientserver.exceptions.ItemNotExistException;
import com.uwb.clientserver.mappers.area.AreaMapper;
import com.uwb.clientserver.models.area.Area;
import com.uwb.clientserver.models.area.AreaVertex;
import com.uwb.clientserver.models.request.area.AreaRequest;
import com.uwb.clientserver.models.response.area.AreaResponse;
import com.uwb.clientserver.repositories.area.AreaRepository;
import com.uwb.clientserver.services.area.AreaService;
import com.uwb.clientserver.services.area.AreaVertexService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AreaServiceImpl implements AreaService {
    private final AreaMapper areaMapper;
    private final AreaRepository areaRepository;
    private final AreaVertexService areaVertexService;

    @Override
    public AreaResponse create(AreaRequest request) {
        Area area = areaMapper.toEntity(request);
        return areaMapper.toResponse(areaRepository.save(area));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaResponse> findAll() {
        return areaMapper.toResponseList(areaRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaResponse> findAllByBackground(Long id) {
        return areaMapper.toResponseList(areaRepository.findAllByBackgroundIdAndDeletedFalse(id));
    }

    @Override
    public AreaResponse update(AreaRequest request) {
        Area area = areaMapper.toEntity(request);
        return areaMapper.toResponse(areaRepository.save(area));
    }

    @Override
    public void delete(Long id) {
        Area area = areaRepository.findById(id).orElseThrow(() -> new ItemNotExistException(id));
        List<Long> areaVertexIds = area.getAreaVertexes().stream()
                .mapToLong(AreaVertex::getId)
                .boxed()
                .toList();
        areaVertexService.deleteList(areaVertexIds);
        areaRepository.softDelete(id);
    }

    @Override
    public void deleteList(List<Long> ids) {
        for(Long id: ids) {
            delete(id);
        }
    }
}

