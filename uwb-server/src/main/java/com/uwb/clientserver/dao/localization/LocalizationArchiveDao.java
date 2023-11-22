package com.uwb.clientserver.dao.localization;

import com.uwb.clientserver.models.response.localization.LocalizationResponse;

import java.time.ZonedDateTime;
import java.util.List;

public interface LocalizationArchiveDao {

    List<LocalizationResponse> findLocalizationsAchiveByTagAndDate(String tagId, ZonedDateTime dateFrom, ZonedDateTime dateTo);

    LocalizationResponse findLastLocalizationArchiveByTag(String tagId);

    List<LocalizationResponse> findAllByDateBetween(ZonedDateTime dateFrom, ZonedDateTime dateTo);
}
