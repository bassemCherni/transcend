package com.scrumosome.backend.repository;

import java.util.List;

import com.scrumosome.backend.models.IssueChat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IssueChatRepository extends JpaRepository<IssueChat, Integer> {

    @Query(value = "SELECT * FROM issue_chat i WHERE i.id_issue = :id ORDER by i.creation_date ASC", nativeQuery = true)
    List<IssueChat> getOrdered(@Param("id") Integer id);

}