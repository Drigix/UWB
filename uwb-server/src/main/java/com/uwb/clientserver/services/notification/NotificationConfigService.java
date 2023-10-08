package com.uwb.clientserver.services.notification;

import com.uwb.clientserver.models.request.notification.NotificationConfigRequest;
import com.uwb.clientserver.models.response.notification.NotificationConfigResponse;

import java.util.List;

public interface NotificationConfigService {

    NotificationConfigResponse create(NotificationConfigRequest request);

    List<NotificationConfigResponse> findAll();

    List<NotificationConfigResponse> findAllByArea(Long id);

    NotificationConfigResponse update(NotificationConfigRequest request);

    void delete(Long id);
}
