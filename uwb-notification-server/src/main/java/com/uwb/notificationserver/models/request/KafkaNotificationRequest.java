package com.uwb.notificationserver.models.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.time.ZonedDateTime;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KafkaNotificationRequest implements Serializable {

    @JsonProperty("title")
    private String title;
    @JsonProperty("message")
    private String message;
    @JsonProperty("areaName")
    private String areaName;
    @JsonProperty("date")
    private ZonedDateTime date;
    @JsonProperty("objectFullName")
    private String objectFullName;
}
