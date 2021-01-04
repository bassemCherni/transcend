package com.scrumosome.backend.repository;

import javax.transaction.Transactional;

import com.scrumosome.backend.models.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<Users, Integer> {

    @Query(value = "select * from users where id_user=:id ", nativeQuery = true)
    Users find (@Param("id") Integer id);

    // pic update
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "update users SET profile_pic = :pic, pic_extension = :ext where id_user=:id ", nativeQuery = true)
    void updatePic (@Param("id") Integer id, @Param("pic") String pic, @Param("ext") String ext);

    // update name and lastname
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "update users SET user_name = :name, last_name = :lastName where id_user=:id ", nativeQuery = true)
    Integer updateName (@Param("id") Integer id, @Param("name") String name, @Param("lastName") String lastName);

    // occupation update
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "update users SET occupation	= :occup where id_user=:id ", nativeQuery = true)
    Integer updateOccupation (@Param("id") Integer id, @Param("occup") String occup);

    // organization update
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "update users SET organization = :org where id_user=:id ", nativeQuery = true)
    Integer updateOrganization (@Param("id") Integer id, @Param("org") String org);

    // tel num update
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "update users SET tel_num = :tel where id_user=:id ", nativeQuery = true)
    Integer updateTel (@Param("id") Integer id, @Param("tel") String tel);

}