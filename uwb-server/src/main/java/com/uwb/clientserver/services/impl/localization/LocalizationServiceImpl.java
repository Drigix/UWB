package com.uwb.clientserver.services.impl.localization;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.uwb.clientserver.dao.localization.LocalizationArchiveDao;
import com.uwb.clientserver.dao.localization.LocalizationDao;
import com.uwb.clientserver.models.area.Area;
import com.uwb.clientserver.models.localization.LocalizationRequest;
import com.uwb.clientserver.models.response.area.AreaReportResponse;
import com.uwb.clientserver.models.response.localization.LocalizationResponse;
import com.uwb.clientserver.services.area.AreaService;
import com.uwb.clientserver.services.localization.LocalizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class LocalizationServiceImpl implements LocalizationService {

    private final LocalizationDao localizationDao;
    private final LocalizationArchiveDao localizationArchiveDao;
    private final AreaService areaService;

    @Override
    @Scheduled(cron = "*/5 * * * * *")
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
    //    Double randomX1 = generateRandomValueBetween(1.7, 8.2);
    //    Double randomY1 = generateRandomValueBetween(18.4, 19.5);
    //    Double randomX2 = generateRandomValueBetween(14.0, 17.5);
    //    Double randomY2 = generateRandomValueBetween(16.7, 19.5);
    //    LocalizationRequest locReq1 = genereteLocalizationRequest(randomX1, randomY1, 1.1, "ab90df1", 11L, "qw57up;");
    //    LocalizationRequest locReq2 = genereteLocalizationRequest(randomX2, randomY2, 1.1, "cqw34e", 11L, "poi23u7;uyt890w;");
    //    areaService.checkIfEnterOrExitArea("ab90df1", 11L, randomX1, randomY1);
    //    areaService.checkIfEnterOrExitArea("po85uxc", 6L, randomX2, randomY2);
    //    localizationDao.createLocalization(locReq1);
    //    localizationDao.createLocalization(locReq2);
    }

    @Override
    public List<AreaReportResponse> findAllByAreaAndDateBetween(List<Long> areaIds, ZonedDateTime dateFrom, ZonedDateTime dateTo) {
        List<AreaReportResponse> response = new ArrayList<>();
        List<LocalizationResponse> archiveLocalizations = localizationArchiveDao.findAllByDateBetween(dateFrom, dateTo);
        for(LocalizationResponse archiveLocalization: archiveLocalizations) {
            for(Long areaId: areaIds) {
                Area area = areaService.findOneEntityById(areaId);
                if(areaService.isPointInsideArea(area.getBackground().getScale(), archiveLocalization.getX(), archiveLocalization.getY(), area.getAreaVertexes())) {
                }
            }
        }
        return response;
    }

    private LocalizationRequest genereteLocalizationRequest(Double X, Double Y, Double Z, String tagId, Long backgroundId, String anchorIds) {
        return LocalizationRequest.builder()
                .date(ZonedDateTime.now())
                .x(X)
                .y(Y)
                .z(Z)
                .tagId(tagId)
                .backgroundId(backgroundId)
                .anchorIds(anchorIds)
                .build();
    }

    private Double generateRandomValueBetween(Double from, Double to) {
        Random random = new Random();
        return from + (random.nextDouble() * (to - from));
    }
}
