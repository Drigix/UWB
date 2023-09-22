package com.uwb.clientserver.repositories.object;

import com.uwb.clientserver.models.object.UwbObjectIcon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UwbObjectIconRepository extends JpaRepository<UwbObjectIcon, Long> {
    List<UwbObjectIcon> findAllByOrganizationUnitIdAndDeletedFalse(Long id);
}
