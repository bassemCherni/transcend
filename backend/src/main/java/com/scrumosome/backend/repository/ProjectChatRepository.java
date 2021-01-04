package com.scrumosome.backend.repository;

import java.util.List;

import com.scrumosome.backend.models.ProjectChat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectChatRepository extends JpaRepository<ProjectChat, Integer> {

    @Query(value = "SELECT * FROM project_chat p WHERE p.id_project = :id ORDER by p.creation_date ASC", nativeQuery = true)
    List<ProjectChat> getOrdered(@Param("id") Integer id);

}