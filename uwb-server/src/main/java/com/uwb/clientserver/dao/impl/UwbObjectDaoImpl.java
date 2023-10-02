package com.uwb.clientserver.dao.impl;

import com.uwb.clientserver.dao.BaseJdbcDouSupport;
import com.uwb.clientserver.dao.UwbObjectDao;
import org.springframework.stereotype.Service;

@Service
public class UwbObjectDaoImpl extends BaseJdbcDouSupport implements UwbObjectDao {

    @Override
    public void createUwbObjectTable(String tagId) {
        String tableName = "tag_" + tagId;
        String createTableQuery = "CREATE TABLE " + tableName + " ("
                + "id BIGSERIAL PRIMARY KEY, "
                + "date TIMESTAMP, "
                + "x DOUBLE PRECISION, "
                + "y DOUBLE PRECISION, "
                + "z DOUBLE PRECISION, "
                + "tag_id VARCHAR(20), "
                + "background_id BIGINT, "
                + "anchor_ids VARCHAR"
                + ")";
        getJdbcTemplate().execute(createTableQuery);
    }

    @Override
    public  void deleteUwbObjectTable(String tagId) {
        String tableName = "tag_" + tagId;
        String deleteTableQuery = "DROP TABLE " + tableName;
        getJdbcTemplate().execute(deleteTableQuery);
    }
}
