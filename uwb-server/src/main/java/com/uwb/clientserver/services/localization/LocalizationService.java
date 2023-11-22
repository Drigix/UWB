package com.uwb.clientserver.services.localization;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.uwb.clientserver.models.response.area.AreaReportResponse;

import java.time.ZonedDateTime;
import java.util.List;

public interface LocalizationService {

    void autoGenerateNewLocalizations() throws JsonProcessingException;

    List<AreaReportResponse> findAllByAreaAndDateBetween(List<Long> areaIds, ZonedDateTime dateFrom, ZonedDateTime dateTo);
}
