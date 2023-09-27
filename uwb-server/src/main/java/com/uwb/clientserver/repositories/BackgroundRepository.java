package com.uwb.clientserver.repositories;

import com.uwb.clientserver.models.Background;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BackgroundRepository extends JpaRepository<Background, Long> {
    List<Background> findAllByOrganizationUnitIdAndDeletedFalse(Long id);

    @Modifying
    @Query("UPDATE Background b SET b.deleted = true WHERE b.id = :id")
    void softDelete(@Param("id") Long id);
}
