package com.uwb.notificationserver.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uwb.notificationserver.models.request.KafkaNotificationRequest;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Deserializer;
import org.springframework.kafka.support.serializer.ErrorHandlingDeserializer;

import java.nio.charset.StandardCharsets;
import java.util.Map;

public class KafkaMessageDeserializer
        extends ErrorHandlingDeserializer<KafkaNotificationRequest>
        implements Deserializer<KafkaNotificationRequest> {

    @Override
    public void configure(Map<String, ?> map, boolean b) {}

    @Override
    public KafkaNotificationRequest deserialize(String s, byte[] bytes) {
        if (bytes == null) {
            return null;
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(new String(bytes,
                    StandardCharsets.UTF_8), KafkaNotificationRequest.class);
        } catch (Exception e) {
            throw new SerializationException("Error when deserializing byte[] to messageDto");
        }
    }

    @Override
    public void close() {}
}
