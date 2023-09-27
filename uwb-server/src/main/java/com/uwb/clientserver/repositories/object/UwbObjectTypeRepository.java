package com.uwb.clientserver.repositories.object;

import com.uwb.clientserver.models.object.UwbObjectType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UwbObjectTypeRepository extends JpaRepository<UwbObjectType, Long> {

    List<UwbObjectType> findAllByOrganizationUnitIdAndDeletedFalse(Long id);

    @Modifying
    @Query("UPDATE UwbObjectType uot SET uot.deleted = true WHERE uot.id = :id")
    void softDelete(@Param("id") Long id);
}
