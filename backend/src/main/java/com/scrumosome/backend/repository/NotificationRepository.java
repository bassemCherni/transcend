package com.scrumosome.backend.repository;

import com.scrumosome.backend.models.Notification;

import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    
}