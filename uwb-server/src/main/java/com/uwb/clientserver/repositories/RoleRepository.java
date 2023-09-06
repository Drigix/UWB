package com.uwb.clientserver.repositories;

import com.uwb.clientserver.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    List<Role> findByUsersId(Long id);
}
