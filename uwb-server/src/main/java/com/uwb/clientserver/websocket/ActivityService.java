package com.uwb.clientserver.websocket;

import com.uwb.clientserver.dao.localization.LocalizationDao;
import com.uwb.clientserver.models.Anchor;
import com.uwb.clientserver.models.response.AnchorResponse;
import com.uwb.clientserver.models.response.localization.LocalizationResponse;
import com.uwb.clientserver.repositories.AnchorRepository;
import com.uwb.clientserver.services.AnchorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Controller
@Slf4j
@RequiredArgsConstructor
public class ActivityService {

    private final SimpMessageSendingOperations messagingTemplate;
    private final AnchorService anchorService;
    private final LocalizationDao localizationDao;

    private TimerTask repetedTask;
    private Timer timer;
    private Map<Object, LocalizationResponse> aggregatedLocalizationData = new ConcurrentHashMap<Object, LocalizationResponse>();

    private Map<Object, AnchorResponse> aggregatedAnchorData = new ConcurrentHashMap<Object, AnchorResponse>();

    public void newLocalizationData(List<LocalizationResponse> localizationResponseList) {
        for(LocalizationResponse localizationResponse: localizationResponseList) {
            if(localizationResponse.getId() != null) {
                aggregatedLocalizationData.put(localizationResponse.getId(), localizationResponse);
            }
        }
    }

    public void newAnchornData(List<AnchorResponse> localizationResponseList) {
        for(AnchorResponse localizationResponse: localizationResponseList) {
            if(localizationResponse.getId() != null) {
                aggregatedAnchorData.put(localizationResponse.getId(), localizationResponse);
            }
        }
    }

    @MessageMapping("/send/localizactions/tag")
    public void handleRequestLocalizations(Long backgroundId) {
        log.info("Localization tag websockets connected.");
        if(repetedTask != null && timer != null) {
            repetedTask.cancel();
            timer.cancel();
        }
        repetedTask = new TimerTask() {
            public void run() {
                List<LocalizationResponse> localizationData = localizationDao.findAllLastLocalizationsInBackground(backgroundId);
                newLocalizationData(localizationData);
                if(!aggregatedLocalizationData.isEmpty()) {
                    messagingTemplate.convertAndSend("/topic/localizactions/tag", aggregatedLocalizationData.values());
                    aggregatedLocalizationData.clear();
                }
            }
        };
        timer = new Timer();
        timer.scheduleAtFixedRate(repetedTask, 0, 1000L);
//        ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
//        executorService.scheduleAtFixedRate(repetedTask, 0, 1000L, TimeUnit.MILLISECONDS);
    }

    @MessageMapping("/stop/localizactions/tag")
    public void handleStopRequestLocalizations() {
        if(timer != null) {
            log.info("Localization tag websockets disconnect.");
            repetedTask.cancel();
            timer.cancel();
        }
    }

//    @MessageMapping("/send/localizactions/tag")
////    @SendTo("/topic/localizactions/tag")
//    public void handleRequestAnchor() {
//        repetedTask = new TimerTask() {
//            public void run() {
//                List<AnchorResponse> anchors = anchorService.findAll();
//                newAnchornData(anchors);
//                if(!aggregatedAnchorData.isEmpty()) {
//                    messagingTemplate.convertAndSend("/topic/localizactions/tag", aggregatedAnchorData.values());
//                    aggregatedAnchorData.clear();
//                }
//            }
//        };
//        ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
//        executorService.scheduleAtFixedRate(repetedTask, 0, 1000L, TimeUnit.MILLISECONDS);
//    }

}
