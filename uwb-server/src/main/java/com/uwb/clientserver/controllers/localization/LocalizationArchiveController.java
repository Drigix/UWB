package com.uwb.clientserver.controllers.localization;

import com.uwb.clientserver.dao.localization.LocalizationArchiveDao;
import com.uwb.clientserver.models.response.localization.LocalizationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import static com.uwb.clientserver.security.AuthoritiesConstants.LOGGED_USER_PREAUTHORIZE;

@RestController
@RequestMapping("/api/localization-archive")
@RequiredArgsConstructor
@Slf4j
public class LocalizationArchiveController {

    private final LocalizationArchiveDao localizationArchiveDao;
    private final static DateTimeFormatter formatter  = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * Endpoint for get all anchors.
     *
     * @return list of anchor response.
     */
    @GetMapping("/{tagId}/{dateFrom}/{dateTo}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<LocalizationResponse> getAllLocalizationArchive(@PathVariable String tagId, @PathVariable String dateFrom, @PathVariable String dateTo) {
        log.info("Request to get localizations archive by tagId {} and dates betweem {}-{}.", tagId, dateFrom, dateTo);
        LocalDateTime parsedDateFrom = LocalDateTime.parse(dateFrom, formatter);
        LocalDateTime parsedDateTo = LocalDateTime.parse(dateTo, formatter);
        ZonedDateTime formatDateFrom = parsedDateFrom.atZone(ZoneId.systemDefault());
        ZonedDateTime formatDateTo = parsedDateTo.atZone(ZoneId.systemDefault());
        return localizationArchiveDao.findLocalizationsAchiveByTagAndDate(tagId, formatDateFrom, formatDateTo);
    }
}
