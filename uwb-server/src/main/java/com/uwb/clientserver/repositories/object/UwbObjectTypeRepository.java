package com.uwb.clientserver.repositories.object;

import com.uwb.clientserver.models.object.UwbObjectType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UwbObjectTypeRepository extends JpaRepository<UwbObjectType, Long> {

    @Query(value = "SELECT * FROM uwb_object_type uot LEFT JOIN organization_unit ou ON uot.organization_unit_id = ou.id WHERE uot.deleted IS NOT TRUE AND (ou.tree_path LIKE CONCAT('%', :stringId, '%') OR ou.id = :id)", nativeQuery = true)
    List<UwbObjectType> findAllByOrganizationUnitAndTreePath(@Param("id") Long id);
    List<UwbObjectType> findAllByOrganizationUnitIdAndDeletedFalse(Long id);
}
