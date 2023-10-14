package com.uwb.notificationserver.service.impl;

import com.uwb.notificationserver.models.Notification;
import com.uwb.notificationserver.repository.NotificationRepository;
import com.uwb.notificationserver.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public void create(Notification notification) {
        notificationRepository.save(notification);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Notification> findAllBetweenDates(ZonedDateTime dateFrom, ZonedDateTime dateTo) {
        return notificationRepository.findAllByDateGreaterThanEqualAndDateLessThanEqual(dateFrom, dateTo);
    }
}
