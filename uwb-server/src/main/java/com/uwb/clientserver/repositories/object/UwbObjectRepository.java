package com.uwb.clientserver.repositories.object;

import com.uwb.clientserver.models.object.UwbObject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UwbObjectRepository extends JpaRepository<UwbObject, Long> {

    @Query(value = "SELECT uo.*, uot.id as object_id FROM uwb_object uo LEFT JOIN uwb_object_type uot ON uo.uwb_object_type_id = uot.id WHERE uo.deleted IS NOT TRUE AND uot.organization_unit_id = :id", nativeQuery = true)
    List<UwbObject> findALLByOrganizationUnitId(@Param("id") Long id);
}
