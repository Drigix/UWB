package com.uwb.clientserver.repositories.area;

import com.uwb.clientserver.models.area.Area;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaRepository extends JpaRepository<Area, Long> {
    List<Area> findAllByBackgroundIdAndDeletedFalse(Long id);

    @Modifying
    @Query("UPDATE Area a SET a.deleted = true WHERE a.id = :id")
    void softDelete(@Param("id") Long id);
}
