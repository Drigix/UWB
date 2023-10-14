package com.uwb.clientserver.models.request.notification;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.time.ZonedDateTime;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class KafkaNotificationRequest implements Serializable {
    private String title;
    private String message;
    private String areaName;
    private String date;
    private String objectFullName;

//    @Override
//    public String toString() {
//        return "KafkaNotificationRequest{" +
//                "title='" + title + '\'' +
//                ", message='" + message + '\'' +
//                ", areaName='" + areaName + '\'' +
//                ", date=" + date +
//                ", objectFullName='" + objectFullName + '\'' +
//                '}';
//    }
    public String changeToKafkaMessage() {
        return title + ";;" + message + ";;" + areaName + ";;" + date + ";;" + objectFullName;
    }
}
