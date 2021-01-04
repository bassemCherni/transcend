package com.scrumosome.backend.repository;


import java.util.List;

import com.scrumosome.backend.models.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @Query(value = "select * from project p where p.id_project = :id and p.title COLLATE 'utf8_general_ci' like %:name%", nativeQuery = true)
    Project search(@Param("id") Integer id, @Param("name") String name);
    
    @Query(value = "SELECT * FROM project w WHERE w.id_work_space = :id and w.archived = false", nativeQuery = true)
    List<Project> findByWorkSpacesIdIn(@Param("id") Integer id);

    @Query(value = "SELECT * FROM project w WHERE w.id_project = :id and w.archived = false", nativeQuery = true)
    Project find(@Param("id") Integer id);
}