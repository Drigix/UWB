package com.uwb.clientserver.dao.impl.localization;

import com.uwb.clientserver.dao.BaseJdbcDouSupport;
import com.uwb.clientserver.dao.localization.LocalizationDao;
import com.uwb.clientserver.models.localization.LocalizationRequest;
import com.uwb.clientserver.models.response.localization.LocalizationResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.TimeZone;

@Service
@Slf4j
public class LocalilzationDaoImpl extends BaseJdbcDouSupport implements LocalizationDao {

    public void createLocalization(LocalizationRequest request) {
        try {
            deleteLastLocalizationRecord(request.getBackgroundId(), request.getTagId());
            createLocalizationInTagTable(request);
            createLovalizationInCacheTable(request);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    public List<LocalizationResponse> findAllLastLocalizationsInBackground(Long backgroundId) {
        try {
            String query = "SELECT lc1.* FROM localization_cache lc1 " +
                    "JOIN (SELECT tag_id, MAX(date) AS max_date FROM localization_cache WHERE background_id = " + backgroundId.toString() +" GROUP BY tag_id) lc2 " +
                    "ON lc1.tag_id = lc2.tag_id AND lc1.date = lc2.max_date";
            return getJdbcTemplate().query(query, localizationResponseRowMapper);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return new LinkedList<LocalizationResponse>();
        }
    }

    private void deleteLastLocalizationRecord(Long backgroundId, String tagId) {
        String deleteLastLocalizationQuery = "DELETE FROM localization_cache WHERE background_id = " + backgroundId.toString() + " AND tag_id = '" + tagId + "'";
        getJdbcTemplate().execute(deleteLastLocalizationQuery);
    }

    private void createLocalizationInTagTable(LocalizationRequest request) {
        String createLocalizationTagQuery = "INSERT INTO tag_" + request.getTagId().toLowerCase() + "(date, x, y, z, tag_id, background_id, anchor_ids) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";
        getJdbcTemplate().update(
                createLocalizationTagQuery,
                request.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime(),
                request.getX(),
                request.getY(),
                request.getZ(),
                request.getTagId(),
                request.getBackgroundId(),
                request.getAnchorIds()
        );
    }

    private void createLovalizationInCacheTable(LocalizationRequest request) {
        String createLocalizationCacheQuery = "INSERT INTO localization_cache(date, x, y, z, tag_id, background_id, anchor_ids) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";
        getJdbcTemplate().update(
                createLocalizationCacheQuery,
                request.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime(),
                request.getX(),
                request.getY(),
                request.getZ(),
                request.getTagId(),
                request.getBackgroundId(),
                request.getAnchorIds()
        );
    }


    private final RowMapper<LocalizationResponse> localizationResponseRowMapper = (rs, rowNum) -> {
        return LocalizationResponse.builder()
                .id(rs.getLong("id"))
                .date(ZonedDateTime.ofInstant(rs.getTimestamp("date").toInstant(), TimeZone.getDefault().toZoneId()))
                .x(rs.getDouble("x"))
                .y(rs.getDouble("y"))
                .z(rs.getDouble("z"))
                .tagId(rs.getString("tag_id"))
                .build();
    };
}
