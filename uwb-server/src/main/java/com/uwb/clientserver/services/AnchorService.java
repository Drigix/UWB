package com.uwb.clientserver.services;

import com.uwb.clientserver.models.request.AnchorRequest;
import com.uwb.clientserver.models.response.AnchorResponse;

import java.util.List;

public interface AnchorService {

    AnchorResponse create(AnchorRequest request);

    List<AnchorResponse> findAll();

    List<AnchorResponse> findAllByBackground(Long id);

    AnchorResponse findOneByName(String name);

    AnchorResponse update(AnchorRequest request);

    void delete(Long id);

    void deleteList(List<Long> ids);
}
