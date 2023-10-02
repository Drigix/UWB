package com.uwb.clientserver.services.impl.object;

import com.uwb.clientserver.dao.UwbObjectDao;
import com.uwb.clientserver.exceptions.ItemNotExistException;
import com.uwb.clientserver.mappers.object.UwbObjectMapper;
import com.uwb.clientserver.models.object.UwbObject;
import com.uwb.clientserver.models.request.object.UwbObjectRequest;
import com.uwb.clientserver.models.response.object.UwbObjectResponse;
import com.uwb.clientserver.repositories.object.UwbObjectRepository;
import com.uwb.clientserver.services.object.UwbObjectIconService;
import com.uwb.clientserver.services.object.UwbObjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class UwbObjectServiceImpl implements UwbObjectService {
    private final UwbObjectMapper uwbObjectMapper;
    private final UwbObjectRepository uwbObjectRepository;
    private final UwbObjectIconService uwbObjectIconService;
    private final UwbObjectDao uwbObjectDao;

    @Override
    public UwbObjectResponse create(UwbObjectRequest request) {
        UwbObject uwbObject = uwbObjectMapper.toEntity(request);
        uwbObjectDao.createUwbObjectTable(uwbObject.getHexTagId());
        return uwbObjectMapper.toResponse(uwbObjectRepository.save(uwbObject));
    }

    @Override
    @Transactional(readOnly = true)
    public List<UwbObjectResponse> findAll() {
        return uwbObjectMapper.toResponseList(uwbObjectRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UwbObjectResponse> findAllByOrganization(Long id) throws IOException {
        List<UwbObject> uwbObjects = uwbObjectRepository.findALLByOrganizationUnitId(id);
        List<UwbObjectResponse> responses = uwbObjectMapper.toResponseList(uwbObjects);
        for(UwbObjectResponse response: responses) {
            UwbObject serachUwbObject = uwbObjects.stream().filter(o -> Objects.equals(o.getId(), response.getId())).findFirst().orElse(null);
            if(serachUwbObject != null) {
                uwbObjectIconService.readAndSetArrayBuffer(response.getUwbObjectType().getUwbObjectIcon(), serachUwbObject.getUwbObjectType().getUwbObjectIcon());
            }
        }
        return uwbObjectMapper.toResponseList(uwbObjectRepository.findALLByOrganizationUnitId(id));
    }

    @Override
    @Transactional(readOnly = true)
    public UwbObjectResponse findOneByHexTagId(String hexTagId) {
        return uwbObjectMapper.toResponse(uwbObjectRepository.findOneByHexTagId(hexTagId).orElse(null));
    }

    @Override
    public UwbObjectResponse update(UwbObjectRequest request) {
        UwbObject uwbObject = uwbObjectMapper.toEntity(request);
        return uwbObjectMapper.toResponse(uwbObjectRepository.save(uwbObject));
    }

    @Override
    public void delete(Long id) {
        UwbObject uwbObject = uwbObjectRepository.findById(id).orElseThrow(() -> new ItemNotExistException(id));
        uwbObjectDao.deleteUwbObjectTable(uwbObject.getHexTagId());
        uwbObjectRepository.softDelete(id);
    }

    @Override
    public void deleteList(List<Long> ids) {
        for(Long id: ids) {
            delete(id);
        }
    }

}
