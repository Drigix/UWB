package com.uwb.clientserver.repositories.area;

import com.uwb.clientserver.models.area.AreaType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaTypeRepository extends JpaRepository<AreaType, Long> {
    List<AreaType> findAllByOrganizationUnitIdAndDeletedFalse(Long id);

    @Modifying
    @Query("UPDATE AreaType at SET at.deleted = true WHERE at.id = :id")
    void softDelete(@Param("id") Long id);
}
