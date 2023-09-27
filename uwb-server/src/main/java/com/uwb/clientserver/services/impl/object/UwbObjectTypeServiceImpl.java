package com.uwb.clientserver.services.impl.object;

import com.uwb.clientserver.exceptions.ItemNotExistException;
import com.uwb.clientserver.mappers.object.UwbObjectTypeMapper;
import com.uwb.clientserver.models.object.UwbObject;
import com.uwb.clientserver.models.object.UwbObjectType;
import com.uwb.clientserver.models.request.object.UwbObjectTypeRequest;
import com.uwb.clientserver.models.response.object.UwbObjectTypeResponse;
import com.uwb.clientserver.repositories.object.UwbObjectTypeRepository;
import com.uwb.clientserver.services.object.UwbObjectIconService;
import com.uwb.clientserver.services.object.UwbObjectService;
import com.uwb.clientserver.services.object.UwbObjectTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class UwbObjectTypeServiceImpl implements UwbObjectTypeService {
    private final UwbObjectTypeMapper uwbObjectTypeMapper;
    private final UwbObjectTypeRepository uwbObjectTypeRepository;
    private final UwbObjectIconService uwbObjectIconService;
    private final UwbObjectService uwbObjectService;

    @Override
    public UwbObjectTypeResponse create(UwbObjectTypeRequest request) {
        UwbObjectType uwbObjectType = uwbObjectTypeMapper.toEntity(request);
        return uwbObjectTypeMapper.toResponse(uwbObjectTypeRepository.save(uwbObjectType));
    }

    @Override
    @Transactional(readOnly = true)
    public List<UwbObjectTypeResponse> findAll() {
        return uwbObjectTypeMapper.toResponseList(uwbObjectTypeRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UwbObjectTypeResponse> findAllByOrganization(Long id) throws IOException {
        List<UwbObjectType> uwbObjectTypes = uwbObjectTypeRepository.findAllByOrganizationUnitIdAndDeletedFalse(id);
        List<UwbObjectTypeResponse> responses = uwbObjectTypeMapper.toResponseList(uwbObjectTypes);
        for(UwbObjectTypeResponse response: responses) {
            UwbObjectType searchUwbObjectType = uwbObjectTypes.stream().filter(b -> Objects.equals(b.getId(), response.getId())).findFirst().orElse(null);
            if(searchUwbObjectType != null) {
                uwbObjectIconService.readAndSetArrayBuffer(response.getUwbObjectIcon(), searchUwbObjectType.getUwbObjectIcon());
            }
        }
        return responses;
    }

    @Override
    public UwbObjectTypeResponse update(UwbObjectTypeRequest request) {
        UwbObjectType uwbObjectType = uwbObjectTypeMapper.toEntity(request);
        return uwbObjectTypeMapper.toResponse(uwbObjectTypeRepository.save(uwbObjectType));
    }

    @Override
    public void delete(Long id) {
        UwbObjectType uwbObjectType = uwbObjectTypeRepository.findById(id).orElseThrow(() -> new ItemNotExistException(id));
        List<Long> uwbObjectIds = uwbObjectType.getUwbObjects()
                .stream()
                .mapToLong(UwbObject::getId)
                .boxed()
                .toList();
        uwbObjectService.deleteList(uwbObjectIds);
        uwbObjectTypeRepository.softDelete(id);
    }

    @Override
    public void deleteList(List<Long> ids) {
        for(Long id: ids) {
            delete(id);
        }
    }


}
