package com.uwb.notificationserver.service;

public interface KafkaListenerService {

    void listenEnterArea(String message);

    void listenExitArea(String message);
}
