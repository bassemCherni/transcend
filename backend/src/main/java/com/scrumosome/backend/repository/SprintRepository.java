package com.scrumosome.backend.repository;

import java.util.List;


import com.scrumosome.backend.models.Sprint;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SprintRepository extends JpaRepository<Sprint, Integer> {

    @Query(value = "select * from sprint where id_project= :id and status!= 'done' and status!= 'on going' ", nativeQuery = true)
    List<Sprint> findByProject (@Param("id") Integer id);

    @Query(value = "select * from sprint where id_project= :id and status!= 'done' and status = 'on going' ", nativeQuery = true)
    Sprint activeSprint (@Param("id") Integer id);

    @Query(value = "select * from sprint where id_project= :id ", nativeQuery = true)
    List<Sprint> allSprints (@Param("id") Integer id);

    @Query(value = "SELECT SUM(story_point) FROM issue WHERE id_sprint = :id and status != 'done' ", nativeQuery = true)
    Integer remainingPoints (@Param("id") Integer id);

    
}