package com.scrumosome.backend.repository;

import java.util.List;

import com.scrumosome.backend.models.Epic;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EpicRepository extends JpaRepository<Epic, Integer> {

    @Query(value = "select * from epic where id_project= :id ", nativeQuery = true)
    List<Epic> findByProject (@Param("id") Integer id);
    
}