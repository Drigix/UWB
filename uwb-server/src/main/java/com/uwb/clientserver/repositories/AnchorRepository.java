package com.uwb.clientserver.repositories;

import com.uwb.clientserver.models.Anchor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnchorRepository extends JpaRepository<Anchor, Long> {

    Optional<Anchor> findByName(String name);

    List<Anchor> findAllByBackgroundIdAndDeletedFalse(Long id);

    @Modifying
    @Query("UPDATE Anchor a SET a.deleted = true WHERE a.id = :id")
    void softDelete(@Param("id") Long id);
}
