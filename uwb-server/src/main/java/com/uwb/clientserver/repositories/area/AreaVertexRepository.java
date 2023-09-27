package com.uwb.clientserver.repositories.area;

import com.uwb.clientserver.models.area.AreaVertex;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaVertexRepository extends JpaRepository<AreaVertex, Long> {

    List<AreaVertex> findAllByAreaId(Long id);

//    @Query(value = "SELECT * FROM area_vertex av JOIN area a ON a.id = av.area_id JOIN background b ON b.id = a.background_id WHERE b.id = :id", nativeQuery = true)
//    List<AreaVertex> findAllByBackgroundId(@Param("id") Long id);
    List<AreaVertex> findAllByAreaBackgroundId(Long id);
}
