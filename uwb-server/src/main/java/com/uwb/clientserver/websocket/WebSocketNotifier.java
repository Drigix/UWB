package com.uwb.clientserver.websocket;

import com.uwb.clientserver.models.response.localization.LocalizationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class WebSocketNotifier {

    private final ActivityService activityService;

    public void localizationDataChange(LocalizationResponse localizationResponse) {
        activityService.newLocalizationData(Collections.singletonList(localizationResponse));
    }
}
