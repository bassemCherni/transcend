package com.scrumosome.backend.repository;

import java.util.List;


import com.scrumosome.backend.models.Issue;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface IssueRepository extends JpaRepository<Issue, Integer> {

    @Query(value = "select * from issue where id_project= :id and id_sprint is null and status !='done' ORDER BY indexer ASC", nativeQuery = true)
    List<Issue> findByProject (@Param("id") Integer id);

    @Query(value = "select * from issue i where i.id_sprint= :id ORDER BY i.indexer ASC", nativeQuery = true)
    List<Issue> findBySprint (@Param("id") Integer id);

    @Query(value = "select * from issue i where i.id_epic= :id ORDER BY i.indexer ASC", nativeQuery = true)
    List<Issue> findByEpic (@Param("id") Integer id);

    @Query(value = "select * from issue i where i.id_sprint= :id and i.status = :status ORDER BY i.last_modified DESC", nativeQuery = true)
    List<Issue> findBySprintAndStatus (@Param("id") Integer id, @Param("status") String status);

    
    @Query(value = "select * from issue i where i.id_sprint= :id and i.status = :status and i.id_assignee = :idAssignee ORDER BY i.last_modified DESC", nativeQuery = true)
    List<Issue> findBySprintStatusAssignee (@Param("id") Integer id, @Param("idAssignee") Integer idAssignee, @Param("status") String status);

    @Query(value = "SELECT MAX(`indexer`) as `indexer` FROM `issue` WHERE id_project = :id AND id_sprint is null", nativeQuery = true)
    Integer maxIndex (@Param("id") Integer id);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE issue i SET i.indexer=:index WHERE i.id_issue= :id", nativeQuery = true)
    void updateIndex (@Param("id") Integer id, @Param("index") Integer index);

    
    @Modifying(clearAutomatically = true)
    @Transactional
    @Query(value = "UPDATE issue i SET i.id_sprint=:idSprint WHERE i.id_issue= :id", nativeQuery = true)
    void setSprint (@Param("id") Integer id, @Param("idSprint") Integer idSprint);
}