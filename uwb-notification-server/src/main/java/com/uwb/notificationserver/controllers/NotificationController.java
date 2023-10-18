package com.uwb.notificationserver.controllers;

import com.uwb.notificationserver.models.Notification;
import com.uwb.notificationserver.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/uwb-notification/notification-archive")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

    private final static DateTimeFormatter formatter  = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private final NotificationService notificationService;

    /**
     * Endpoint for get all localizations by dates.
     * @param dateFrom first date of range
     * @param dateTo second date of range
     * @return list of notifications.
     */
    @GetMapping("/{dateFrom}/{dateTo}")
    public List<Notification> getAllNotificationsBetweenDates(@PathVariable String dateFrom, @PathVariable String dateTo) {
        log.info("Request to get all anchors.");
        LocalDateTime parsedDateFrom = LocalDateTime.parse(dateFrom, formatter);
        LocalDateTime parsedDateTo = LocalDateTime.parse(dateTo, formatter);
        ZonedDateTime formatDateFrom = parsedDateFrom.atZone(ZoneId.systemDefault());
        ZonedDateTime formatDateTo = parsedDateTo.atZone(ZoneId.systemDefault());
        return notificationService.findAllBetweenDates(formatDateFrom, formatDateTo);
    }

    @GetMapping("/test")
    public String getTemp() {
        return "TEST";
    }
}
