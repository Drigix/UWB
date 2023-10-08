package com.uwb.clientserver.services.impl.notification;

import com.uwb.clientserver.mappers.notification.NotificationConfigMapper;
import com.uwb.clientserver.models.notification.NotificationConfig;
import com.uwb.clientserver.models.request.notification.NotificationConfigRequest;
import com.uwb.clientserver.models.response.notification.NotificationConfigResponse;
import com.uwb.clientserver.repositories.notification.NotificationConfigRepository;
import com.uwb.clientserver.services.notification.NotificationConfigService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationConfigServiceImpl implements NotificationConfigService {

    private final NotificationConfigRepository notificationConfigRepository;
    private final NotificationConfigMapper notificationConfigMapper;

    @Override
    public NotificationConfigResponse create(NotificationConfigRequest request) {
        NotificationConfig notificationConfig = notificationConfigMapper.toEntity(request);
        return notificationConfigMapper.toResponse(notificationConfigRepository.save(notificationConfig));
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationConfigResponse> findAll() {
        return notificationConfigMapper.toResponseList(notificationConfigRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationConfigResponse> findAllByArea(Long id) {
        return notificationConfigMapper.toResponseList(notificationConfigRepository.findAllByAreas_Id(id));
    }


    @Override
    public NotificationConfigResponse update(NotificationConfigRequest request) {
        NotificationConfig notificationConfig = notificationConfigMapper.toEntity(request);
        return notificationConfigMapper.toResponse(notificationConfigRepository.save(notificationConfig));
    }

    @Override
    public void delete(Long id) {
        notificationConfigRepository.deleteById(id);
    }
}
