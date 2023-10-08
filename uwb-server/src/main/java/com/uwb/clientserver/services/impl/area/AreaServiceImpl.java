package com.uwb.clientserver.services.impl.area;

import com.uwb.clientserver.dao.localization.LocalizationArchiveDao;
import com.uwb.clientserver.exceptions.ItemNotExistException;
import com.uwb.clientserver.mappers.area.AreaMapper;
import com.uwb.clientserver.models.area.Area;
import com.uwb.clientserver.models.area.AreaVertex;
import com.uwb.clientserver.models.notification.NotificationTypeConstans;
import com.uwb.clientserver.models.request.area.AreaRequest;
import com.uwb.clientserver.models.response.area.AreaResponse;
import com.uwb.clientserver.models.response.localization.LocalizationResponse;
import com.uwb.clientserver.models.response.notification.NotificationConfigResponse;
import com.uwb.clientserver.repositories.area.AreaRepository;
import com.uwb.clientserver.services.area.AreaService;
import com.uwb.clientserver.services.area.AreaVertexService;
import com.uwb.clientserver.services.notification.NotificationConfigService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AreaServiceImpl implements AreaService {

    private final AreaMapper areaMapper;
    private final AreaRepository areaRepository;
    private final AreaVertexService areaVertexService;
    private final LocalizationArchiveDao localizationArchiveDao;
    private final NotificationConfigService notificationConfigService;


    @Override
    public AreaResponse create(AreaRequest request) {
        Area area = areaMapper.toEntity(request);
        return areaMapper.toResponse(areaRepository.save(area));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaResponse> findAll() {
        return areaMapper.toResponseList(areaRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaResponse> findAllByBackground(Long id) {
        return areaMapper.toResponseList(areaRepository.findAllByBackgroundIdAndDeletedFalse(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AreaResponse> findAllByOrganizationUnit(Long id) {
        return areaMapper.toResponseList(areaRepository.findAllByBackgroundOrganizationUnitIdAndDeletedFalse(id));
    }


    @Override
    public AreaResponse update(AreaRequest request) {
        Area area = areaMapper.toEntity(request);
        return areaMapper.toResponse(areaRepository.save(area));
    }

    @Override
    public void delete(Long id) {
        Area area = areaRepository.findById(id).orElseThrow(() -> new ItemNotExistException(id));
        List<Long> areaVertexIds = area.getAreaVertexes().stream()
                .mapToLong(AreaVertex::getId)
                .boxed()
                .toList();
        areaVertexService.deleteList(areaVertexIds);
        areaRepository.softDelete(id);
    }

    @Override
    public void deleteList(List<Long> ids) {
        for(Long id: ids) {
            delete(id);
        }
    }

    @Override
    public void checkIfEnterOrExitArea(String tagId, Long backgroundId, Double x, Double y) {
        LocalizationResponse lastTagLocalization = localizationArchiveDao.findLastLocalizationArchiveByTag(tagId);
        List<Area> areas = areaRepository.findAllByBackgroundIdAndDeletedFalse(backgroundId);
        for (Area area : areas) {
            List<NotificationConfigResponse> notificationConfigResponses = notificationConfigService.findAllByArea(area.getId());
            if(!notificationConfigResponses.isEmpty()) {
                List<AreaVertex> vertexes = area.getAreaVertexes();
                boolean isLastLocalizationInside = isPointInsideArea(area.getBackground().getScale(), lastTagLocalization.getX(), lastTagLocalization.getY(), vertexes);
                boolean isCurrentLocalizationInside = isPointInsideArea(area.getBackground().getScale(), x, y, vertexes);

                if (isCurrentLocalizationInside) {
                    log.info("Punkt (" + x + ", " + y + ") znajduje się w obszarze o ID: " + area.getId());
                }
                if(!isLastLocalizationInside && isCurrentLocalizationInside) {
                    Optional<NotificationConfigResponse> firstEnterAreaNotification = notificationConfigResponses.stream()
                            .filter(response -> Objects.equals(response.getNotificationTypeId(), NotificationTypeConstans.getEnterAreaTypeId()))
                            .findFirst();
                    if(firstEnterAreaNotification.isPresent()) {
                        log.info("Sent email about enter!");
                    }
                } else if (isLastLocalizationInside && !isCurrentLocalizationInside) {
                    Optional<NotificationConfigResponse> firstExitAreaNotification = notificationConfigResponses.stream()
                            .filter(response -> Objects.equals(response.getNotificationTypeId(), NotificationTypeConstans.getExitAreaTypeId()))
                            .findFirst();
                    if(firstExitAreaNotification.isPresent()) {
                        log.info("Sent email about exit!");
                    }
                }
            }
        }
    }

    private boolean isPointInsideArea(Double backgroundScale, Double x, Double y, List<AreaVertex> vertexes) {
        double minX = Double.MAX_VALUE;
        double maxX = Double.MIN_VALUE;
        double minY = Double.MAX_VALUE;
        double maxY = Double.MIN_VALUE;

        // Znajdź minX, maxX, minY, maxY
        for (AreaVertex vertex : vertexes) {
            double vx = vertex.getX() / backgroundScale;
            double vy = vertex.getY() / backgroundScale;

            minX = Math.min(minX, vx);
            maxX = Math.max(maxX, vx);
            minY = Math.min(minY, vy);
            maxY = Math.max(maxY, vy);
        }

        // Sprawdź, czy punkt (x, y) znajduje się wewnątrz figury
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }
}

