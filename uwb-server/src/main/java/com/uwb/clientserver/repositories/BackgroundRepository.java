package com.uwb.clientserver.repositories;

import com.uwb.clientserver.models.Background;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BackgroundRepository extends JpaRepository<Background, Long> {
    List<Background> findAllByOrganizationUnitIdAndDeletedFalse(Long id);
}
