package com.uwb.clientserver.services.impl.object;

import com.uwb.clientserver.config.ApplicationPaths;
import com.uwb.clientserver.exceptions.ItemNotExistException;
import com.uwb.clientserver.mappers.object.UwbObjectIconMapper;
import com.uwb.clientserver.models.object.UwbObjectIcon;
import com.uwb.clientserver.models.request.object.UwbObjectIconRequest;
import com.uwb.clientserver.models.response.object.UwbObjectIconResponse;
import com.uwb.clientserver.repositories.object.UwbObjectIconRepository;
import com.uwb.clientserver.services.object.UwbObjectIconService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class UwbObjectIconServiceImpl implements UwbObjectIconService {
    private final UwbObjectIconMapper uwbObjectIconMapper;
    private final UwbObjectIconRepository uwbObjectIconRepository;
    private final ApplicationPaths applicationPaths;

    @Override
    public UwbObjectIconResponse create(UwbObjectIconRequest request) {
        UwbObjectIcon uwbObjectIcon = uwbObjectIconMapper.toEntity(request);
        uwbObjectIcon.setPath(applicationPaths.getObjectIconPath());
        return uwbObjectIconMapper.toResponse(uwbObjectIconRepository.save(uwbObjectIcon));
    }

    @Override
    public void uploadFile(MultipartFile file) throws IOException {
        String objectIconPath = applicationPaths.getObjectIconPath();
        Path path = Paths.get(objectIconPath + file.getOriginalFilename());
        byte[] bytes = file.getBytes();
        Files.write(path, bytes);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UwbObjectIconResponse> findAll() {
        return uwbObjectIconMapper.toResponseList(uwbObjectIconRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UwbObjectIconResponse> findAllByOrganization(Long id) throws IOException {
        List<UwbObjectIcon> uwbObjectIcons = uwbObjectIconRepository.findAllByOrganizationUnitIdAndDeletedFalse(id);
        List<UwbObjectIconResponse> responses = uwbObjectIconMapper.toResponseList(uwbObjectIcons);
        for(UwbObjectIconResponse response: responses) {
            UwbObjectIcon searchUwbObjectIcon = uwbObjectIcons.stream().filter(b -> Objects.equals(b.getId(), response.getId())).findFirst().orElse(null);
            if(searchUwbObjectIcon != null) {
                readAndSetArrayBuffer(response, searchUwbObjectIcon);
            }
        }
        return responses;
    }

    @Override
    public UwbObjectIconResponse update(UwbObjectIconRequest request) {
        UwbObjectIcon uwbObjectIcon = uwbObjectIconMapper.toEntity(request);
        return uwbObjectIconMapper.toResponse(uwbObjectIconRepository.save(uwbObjectIcon));
    }

    @Override
    public void delete(Long id) {
        UwbObjectIcon uwbObjectIcon = uwbObjectIconRepository.findById(id).orElseThrow(() -> new ItemNotExistException(id));
        uwbObjectIcon.setDeleted(true);
        uwbObjectIconRepository.save(uwbObjectIcon);
    }

    @Override
    public void readAndSetArrayBuffer(UwbObjectIconResponse response, UwbObjectIcon searchUwbObjectIcon) throws IOException {
        Path objectIconPath = Paths.get(searchUwbObjectIcon.getPath() + searchUwbObjectIcon.getFileName());
        response.setPathArrayBuffer(Files.readAllBytes(objectIconPath));
    }

}
