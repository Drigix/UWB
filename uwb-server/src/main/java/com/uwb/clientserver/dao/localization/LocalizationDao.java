package com.uwb.clientserver.dao.localization;

import com.uwb.clientserver.models.localization.LocalizationRequest;
import com.uwb.clientserver.models.response.localization.LocalizationResponse;

import java.util.List;

public interface LocalizationDao {

    void createLocalization(LocalizationRequest request);

    List<LocalizationResponse> findAllLastLocalizationsInBackground(Long backgroundId);
}
