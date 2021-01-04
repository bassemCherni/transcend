package com.scrumosome.backend.repository;

import com.scrumosome.backend.models.NotificationType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NotificationTypeRepository extends JpaRepository<NotificationType, Integer> {
    
    @Query(value = "SELECT * FROM notification_type n WHERE n.id = ? ", nativeQuery = true)
    NotificationType find(@Param("id") Integer id);
}