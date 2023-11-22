package com.uwb.notificationserver.service.impl;

import com.uwb.notificationserver.models.Notification;
import com.uwb.notificationserver.models.request.KafkaNotificationRequest;
import com.uwb.notificationserver.service.KafkaListenerService;
import com.uwb.notificationserver.service.MailService;
import com.uwb.notificationserver.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaListenerServiceImpl implements KafkaListenerService {

    private final MailService mailService;
    private final NotificationService notificationService;

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").withZone(ZoneId.systemDefault());

    @KafkaListener(topics = "ENTER_AREA", groupId = "uwb")
    public void listenEnterArea(String message) {
        log.info("Received Message in group uwb: " + message);
        deserializeKafkaMessage(message);
    }

    @KafkaListener(topics = "EXIT_AREA", groupId = "uwb")
    public void listenExitArea(String message) {
        log.info("Received Message in group uwb: " + message);
        deserializeKafkaMessage(message);
    }

    public void deserializeKafkaMessage(String jsonMessage) {
        String[] jsonMessageSplit = jsonMessage.split(";;");
        if(jsonMessageSplit.length > 0) {
            Notification notification = Notification.builder()
                    .title(formatString(jsonMessageSplit[0]))
                    .message(formatString(jsonMessageSplit[1]))
                    .areaName(formatString(jsonMessageSplit[2]))
                    .date(LocalDateTime.parse(jsonMessageSplit[3], formatter).atZone(ZoneId.systemDefault()))
                    .objectFullName(formatString(jsonMessageSplit[4]))
                    .build();
            notificationService.create(notification);
            mailService.sendEmail(notification.getTitle(), notification.getMessage());
        }
    }

    private String formatString(String field) {
        if(field.startsWith("\"")) {
            return field.substring(1);
        } else if(field.endsWith("\"")) {
            return field.substring(0, field.length() - 1);
        } else {
            return field;
        }
    }
}
