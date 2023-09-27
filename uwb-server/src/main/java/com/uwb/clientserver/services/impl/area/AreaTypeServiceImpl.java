package com.uwb.clientserver.services.impl.area;

import com.uwb.clientserver.exceptions.ItemNotExistException;
import com.uwb.clientserver.mappers.area.AreaTypeMapper;
import com.uwb.clientserver.models.area.Area;
import com.uwb.clientserver.models.area.AreaType;
import com.uwb.clientserver.models.request.area.AreaTypeRequest;
import com.uwb.clientserver.models.response.area.AreaTypeResponse;
import com.uwb.clientserver.repositories.area.AreaTypeRepository;
import com.uwb.clientserver.services.area.AreaService;
import com.uwb.clientserver.services.area.AreaTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AreaTypeServiceImpl implements AreaTypeService {
    private final AreaTypeMapper areaTypeMapper;
    private final AreaTypeRepository areaTypeRepository;
    private final AreaService areaService;

    @Override
    public AreaTypeResponse create(AreaTypeRequest request) {
        AreaType areaType = areaTypeMapper.toEntity(request);
        return areaTypeMapper.toResponse(areaTypeRepository.save(areaType));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaTypeResponse> findAll() {
        return areaTypeMapper.toResponseList(areaTypeRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaTypeResponse> findAllByOrganization(Long id) {
        return areaTypeMapper.toResponseList(areaTypeRepository.findAllByOrganizationUnitIdAndDeletedFalse(id));
    }

    @Override
    public AreaTypeResponse update(AreaTypeRequest request) {
        AreaType areaType = areaTypeMapper.toEntity(request);
        return areaTypeMapper.toResponse(areaTypeRepository.save(areaType));
    }

    @Override
    public void delete(Long id) {
        AreaType areaType = areaTypeRepository.findById(id).orElseThrow(() -> new ItemNotExistException(id));
        List<Long> areaIds = areaType.getAreas().stream().mapToLong(Area::getId).boxed().toList();
        areaService.deleteList(areaIds);
        areaTypeRepository.softDelete(id);
    }

    @Override
    public void deleteList(List<Long> ids) {
        for(Long id: ids) {
            delete(id);
        }
    }

}

