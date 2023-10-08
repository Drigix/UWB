package com.uwb.clientserver.dao.impl.localization;

import com.uwb.clientserver.dao.BaseJdbcDouSupport;
import com.uwb.clientserver.dao.localization.LocalizationArchiveDao;
import com.uwb.clientserver.models.response.localization.LocalizationResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.TimeZone;

@Service
@Slf4j
public class LocalizationArchiveDaoImpl extends BaseJdbcDouSupport implements LocalizationArchiveDao {

    @Override
    public List<LocalizationResponse> findLocalizationsAchiveByTagAndDate(String tagId, ZonedDateTime dateFrom, ZonedDateTime dateTo) {
        String query = "SELECT t.*, uoi.path, uoi.file_name FROM tag_" + tagId + " t " +
                "JOIN uwb_object uo ON uo.hex_tag_id = t.tag_id " +
                "JOIN uwb_object_type uot ON uot.id = uo.uwb_object_type_id " +
                "JOIN uwb_object_icon uoi ON uoi.id = uot.uwb_object_icon_id " +
                "WHERE t.date BETWEEN '" + Timestamp.from(dateFrom.toInstant()) + "' AND '" + Timestamp.from(dateTo.toInstant()) + "'";
        return getJdbcTemplate().query(query, localizationResponseRowMapper);
    }

    @Override
    public LocalizationResponse findLastLocalizationArchiveByTag(String tagId) {
        String query = "SELECT * FROM tag_" + tagId + " t  ORDER BY t.date DESC LIMIT 1";
        return getJdbcTemplate().queryForObject(query, lastLocalizationResponseRowMapper);
    }

    private final RowMapper<LocalizationResponse> localizationResponseRowMapper = (rs, rowNum) -> {
        try {
            return LocalizationResponse.builder()
                    .id(rs.getLong("id"))
                    .date(ZonedDateTime.ofInstant(rs.getTimestamp("date").toInstant(), TimeZone.getDefault().toZoneId()))
                    .x(rs.getDouble("x"))
                    .y(rs.getDouble("y"))
                    .z(rs.getDouble("z"))
                    .tagId(rs.getString("tag_id"))
                    .pathArrayBuffer(getTagIconFromPath(rs.getString("path") + rs.getString("file_name")))
                    .build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    };

    private final RowMapper<LocalizationResponse> lastLocalizationResponseRowMapper = (rs, rowNum) -> {
        return LocalizationResponse.builder()
                .id(rs.getLong("id"))
                .date(ZonedDateTime.ofInstant(rs.getTimestamp("date").toInstant(), TimeZone.getDefault().toZoneId()))
                .x(rs.getDouble("x"))
                .y(rs.getDouble("y"))
                .z(rs.getDouble("z"))
                .tagId(rs.getString("tag_id"))
                .build();
    };

    private byte[] getTagIconFromPath(String path) throws IOException {
        Path tagPath = Paths.get(path);
        return Files.readAllBytes(tagPath);
    }
}
