package com.uwb.clientserver.services.impl.localization;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.uwb.clientserver.dao.localization.LocalizationDao;
import com.uwb.clientserver.models.localization.LocalizationRequest;
import com.uwb.clientserver.services.area.AreaService;
import com.uwb.clientserver.services.localization.LocalizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class LocalizationServiceImpl implements LocalizationService {

    private final LocalizationDao localizationDao;
    private final AreaService areaService;

    @Override
    @Scheduled(cron = "*/5 * * * * *")
//    @Scheduled(cron = "0 * * * * ?")
    public void autoGenerateNewLocalizations() throws JsonProcessingException {
//        Random random = new Random();
//        Double randomX1 = 2.0 + (random.nextDouble() * (19.0 - 2.0));
//        Double randomY1 = 12.0 + (random.nextDouble() * (19.0 - 12.0));
//        Double randomZ1 = 0.5 + (random.nextDouble() * (3.0 - 0.5));
//        Double randomX2 = 2.0 + (random.nextDouble() * (19.0 - 2.0));
//        Double randomY2 = 12.0 + (random.nextDouble() * (19.0 - 12.0));
//        Double randomZ2 = 0.5 + (random.nextDouble() * (3.0 - 0.5));
//        LocalizationRequest localizationRequest = LocalizationRequest.builder()
//                .date(ZonedDateTime.now())
//                .x(randomX1)
//                .y(randomY1)
//                .z(randomZ1)
//                .tagId("qwe12rt")
//                .backgroundId(6L)
//                .anchorIds("ABC12357;ABC12355;")
//                .build();
//        LocalizationRequest localizationRequest2 = LocalizationRequest.builder()
//                .date(ZonedDateTime.now())
//                .x(randomX2)
//                .y(randomY2)
//                .z(randomZ2)
//                .tagId("po85uxc")
//                .backgroundId(6L)
//                .anchorIds("ABC12357;ABC12355;")
//                .build();
//        areaService.checkIfEnterOrExitArea("qwe12rt", 6L, randomX1, randomY1);
//        areaService.checkIfEnterOrExitArea("po85uxc", 6L, randomX2, randomY2);
//        localizationDao.createLocalization(localizationRequest);
//        localizationDao.createLocalization(localizationRequest2);
    }
}
