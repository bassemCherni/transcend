package com.scrumosome.backend.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.scrumosome.backend.models.Affiliation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AffiliationRepository extends JpaRepository<Affiliation, Integer> {

    @Query(value = "select * from affiliation w where w.id_account = :id and w.active= true ", nativeQuery = true)
    List<Affiliation> findByAccount(@Param("id") Integer id);

    @Query(value = "select * from affiliation w where w.id_account = :id and w.role = 'admin' and w.active= true", nativeQuery = true)
    List<Affiliation> getByAdmin(@Param("id") Integer id);
    
    @Query(value = "select * from affiliation w where w.id_work_space = :id and w.active= true", nativeQuery = true)
    List<Affiliation> findByWorkSpace(@Param("id") Integer id);

    // only memebers
    @Query(value = "select * from affiliation w where w.id_work_space = :id and w.active= true and w.role != 'admin' ", nativeQuery = true)
    List<Affiliation> workspaceMembers(@Param("id") Integer id);

    @Query(value = "select * from affiliation w where w.id_account = :id_account and  w.id_work_space = :id and w.active= true", nativeQuery = true)
    Affiliation findByAccountAndWs(@Param("id_account") Integer id_account, @Param("id") Integer id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE affiliation w SET w.active = false where w.id_work_space= :id", nativeQuery = true)
    Integer archive(@Param("id") Integer id);

    @Query(value = "select * from affiliation w where w.id_work_space = :id and w.role = :role and w.active= true", nativeQuery = true)
    List<Affiliation> searchByWsAndRole(@Param("id") Integer id, @Param("role") String role);

    @Query(value = "select * from affiliation w where w.id_work_space = :id and w.role = 'admin' and w.active= true", nativeQuery = true)
    Affiliation adminAffiliation(@Param("id") Integer id);
}