package com.uwb.notificationserver.service;

import com.uwb.notificationserver.models.Notification;

import java.time.ZonedDateTime;
import java.util.List;

public interface NotificationService {

    void create(Notification notification);

    List<Notification> findAllBetweenDates(ZonedDateTime dateFrom, ZonedDateTime dateTo);
}
