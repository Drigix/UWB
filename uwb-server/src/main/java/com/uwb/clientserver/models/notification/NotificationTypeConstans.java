package com.uwb.clientserver.models.notification;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@Getter
@Setter
public class NotificationTypeConstans {
    private Long id;
    private String name;
    private static NotificationTypeConstans ENTER_AREA = NotificationTypeConstans.builder().id(1L).name("ENTER_AREA").build();
    private static NotificationTypeConstans EXIT_AREA = NotificationTypeConstans.builder().id(2L).name("EXIT_AREA").build();

    public static Long getEnterAreaTypeId() {
        return ENTER_AREA.getId();
    }

    public static Long getExitAreaTypeId() {
        return EXIT_AREA.getId();
    }
}
