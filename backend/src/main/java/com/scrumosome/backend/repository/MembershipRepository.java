package com.scrumosome.backend.repository;



import java.util.List;

import com.scrumosome.backend.models.Membership;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface MembershipRepository extends JpaRepository<Membership, Integer> {

    @Query(value = "select * from membership where id_account=:id_account and active= true ", nativeQuery = true)
    List<Membership> findSpecific (@Param("id_account") Integer id_account);

    @Query(value = "select * from membership where id_project=:id_project and active= true ", nativeQuery = true)
    List<Membership> findSpecificProject (@Param("id_project") Integer id_project);

    @Query(value = "select * from membership where id=:id and active= true ", nativeQuery = true)
    Membership find (@Param("id") Integer id);

    @Query(value = "select * from membership where id_account=:id_account and id_project=:id_project and active= true ", nativeQuery = true)
    Membership getMembership (@Param("id_account") Integer id_account, @Param("id_project") Integer id_project);


    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "update membership set active = false where id_project= :id_project and id_account=:id_account ", nativeQuery = true)
    void archiveMembership (@Param("id_project") Integer id_project, @Param("id_account") Integer id_account);

}