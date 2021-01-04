package com.scrumosome.backend.repository;




import javax.transaction.Transactional;

import com.scrumosome.backend.models.WorkSpace;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface WorkSpaceRepository extends JpaRepository<WorkSpace, Integer> {

    @Query(value = "SELECT * FROM work_space w WHERE w.id_work_space= :id and w.status = 'active'", nativeQuery = true)
    WorkSpace findByWorkSpacesIdIn(@Param("id") Integer id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE work_space w SET w.status = 'archived' where w.id_work_space= :id", nativeQuery = true)
    Integer archive(@Param("id") Integer id);

    @Query(value = "SELECT * FROM work_space w WHERE w.id_work_space = :id and w.name COLLATE 'utf8_general_ci' like %:name% ", nativeQuery = true)
    WorkSpace searchWorkSpaces(@Param("id") Integer id, @Param("name") String name);

    WorkSpace findByName(String name);
}