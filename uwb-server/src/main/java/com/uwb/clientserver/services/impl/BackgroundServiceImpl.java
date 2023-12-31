package com.uwb.clientserver.services.impl;

import com.uwb.clientserver.config.ApplicationPaths;
import com.uwb.clientserver.mappers.BackgroundMapper;
import com.uwb.clientserver.models.Background;
import com.uwb.clientserver.models.request.BackgroundRequest;
import com.uwb.clientserver.models.response.BackgroundResponse;
import com.uwb.clientserver.repositories.BackgroundRepository;
import com.uwb.clientserver.services.BackgroundService;
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
public class BackgroundServiceImpl implements BackgroundService {

    private final BackgroundMapper backgroundMapper;
    private final BackgroundRepository backgroundRepository;
    private final ApplicationPaths applicationPaths;

    @Override
    public BackgroundResponse create(BackgroundRequest request) {
        Background background = backgroundMapper.toEntity(request);
        background.setPath(applicationPaths.getBackgroundPath());
        return backgroundMapper.toResponse(backgroundRepository.save(background));
    }

    @Override
    public void uploadFile(MultipartFile file) throws IOException {
        String backgroundPath = applicationPaths.getBackgroundPath();
        Path path = Paths.get(backgroundPath + file.getOriginalFilename());
        byte[] bytes = file.getBytes();
        Files.write(path, bytes);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BackgroundResponse> findAll() {
        return backgroundMapper.toResponseList(backgroundRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BackgroundResponse> findAllByOrganization(Long id) throws IOException {
        List<Background> backgrounds = backgroundRepository.findAllByOrganizationUnitIdAndDeletedFalse(id);
        List<BackgroundResponse> responses = backgroundMapper.toResponseList(backgrounds);
        for(BackgroundResponse response: responses) {
            Background searchBackground = backgrounds.stream().filter(b -> Objects.equals(b.getId(), response.getId())).findFirst().orElse(null);
            if(searchBackground != null) {
                Path backgroundPath = Paths.get(searchBackground.getPath() + searchBackground.getFileName());
                response.setPathArrayBuffer(Files.readAllBytes(backgroundPath));
            }
        }
        return responses;
    }

    @Override
    public BackgroundResponse update(BackgroundRequest request) {
        Background background = backgroundMapper.toEntity(request);
        return backgroundMapper.toResponse(backgroundRepository.save(background));
    }

    @Override
    public void delete(Long id) {
        backgroundRepository.softDelete(id);
    }

    @Override
    public void deleteList(List<Long> ids) {
        for(Long id: ids) {
            delete(id);
        }
    }

}
