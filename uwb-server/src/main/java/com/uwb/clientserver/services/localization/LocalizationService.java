package com.uwb.clientserver.services.localization;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface LocalizationService {
    void autoGenerateNewLocalizations() throws JsonProcessingException;
}
