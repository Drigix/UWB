package com.uwb.clientserver.repositories.notification;

import com.uwb.clientserver.models.notification.NotificationConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationConfigRepository extends JpaRepository<NotificationConfig, Long> {

    List<NotificationConfig> findAllByAreas_Id(Long id);
}
