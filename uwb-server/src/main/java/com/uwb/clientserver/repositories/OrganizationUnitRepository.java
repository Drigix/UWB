package com.uwb.clientserver.repositories;

import com.uwb.clientserver.models.OrganizationUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganizationUnitRepository extends JpaRepository<OrganizationUnit, Long> {
    @Query(value = "SELECT * FROM organization_unit WHERE deleted IS NOT TRUE AND (tree_path LIKE CONCAT('%', :stringId, '%') OR id = :id)", nativeQuery = true)
    List<OrganizationUnit> findAllForUser(@Param("stringId") String stringId, @Param("id") Long id);

    @Modifying
    @Query("UPDATE OrganizationUnit uo SET uo.deleted = true WHERE uo.id = :id")
    void softDelete(@Param("id") Long id);
}
