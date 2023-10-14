package com.uwb.notificationserver.repository;

import com.uwb.notificationserver.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {

    List<Notification> findAllByDateGreaterThanEqualAndDateLessThanEqual(ZonedDateTime dateFrom, ZonedDateTime dateTo);
}
