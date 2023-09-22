package com.uwb.clientserver.services.object;

import com.uwb.clientserver.models.object.UwbObjectIcon;
import com.uwb.clientserver.models.request.object.UwbObjectIconRequest;
import com.uwb.clientserver.models.response.object.UwbObjectIconResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UwbObjectIconService {
    UwbObjectIconResponse create(UwbObjectIconRequest request);

    void uploadFile(MultipartFile file) throws IOException;

    List<UwbObjectIconResponse> findAll();

    List<UwbObjectIconResponse> findAllByOrganization(Long id) throws IOException;

    UwbObjectIconResponse update(UwbObjectIconRequest request);

    void delete(Long id);

    void readAndSetArrayBuffer(UwbObjectIconResponse response, UwbObjectIcon searchUwbObjectIcon) throws IOException;
}
