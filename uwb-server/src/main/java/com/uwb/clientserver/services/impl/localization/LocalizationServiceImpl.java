package com.uwb.clientserver.services.impl.localization;

import com.uwb.clientserver.dao.localization.LocalizationDao;
import com.uwb.clientserver.models.localization.LocalizationRequest;
import com.uwb.clientserver.services.localization.LocalizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class LocalizationServiceImpl implements LocalizationService {

    private final LocalizationDao localizationDao;

    @Override
    @Scheduled(cron = "*/1 * * * * *")
    public void autoGenerateNewLocalizations() {
//        Random random = new Random();
//        LocalizationRequest localizationRequest = LocalizationRequest.builder()
//                .date(ZonedDateTime.now())
//                .x(2.0 + (random.nextDouble() * (19.0 - 2.0)))
//                .y(12.0 + (random.nextDouble() * (19.0 - 12.0)))
//                .z(0.5 + (random.nextDouble() * (3.0 - 0.5)))
//                .tagId("qwe12rt")
//                .backgroundId(6L)
//                .anchorIds("ABC12357;ABC12355;")
//                .build();
//        LocalizationRequest localizationRequest2 = LocalizationRequest.builder()
//                .date(ZonedDateTime.now())
//                .x(2.0 + (random.nextDouble() * (19.0 - 2.0)))
//                .y(12.0 + (random.nextDouble() * (19.0 - 12.0)))
//                .z(0.5 + (random.nextDouble() * (3.0 - 0.5)))
//                .tagId("po85uxc")
//                .backgroundId(6L)
//                .anchorIds("ABC12357;ABC12355;")
//                .build();
//        localizationDao.createLocalization(localizationRequest);
//        localizationDao.createLocalization(localizationRequest2);
    }
}
