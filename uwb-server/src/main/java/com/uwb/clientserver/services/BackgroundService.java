package com.uwb.clientserver.services;

import com.uwb.clientserver.models.request.BackgroundRequest;
import com.uwb.clientserver.models.response.BackgroundResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BackgroundService {
    BackgroundResponse create(BackgroundRequest request);

    void uploadFile(MultipartFile file) throws IOException;

    List<BackgroundResponse> findAll();

    List<BackgroundResponse> findAllByOrganization(Long id) throws IOException;

    BackgroundResponse update(BackgroundRequest request);

    void delete(Long id);

    void deleteList(List<Long> ids);
}
