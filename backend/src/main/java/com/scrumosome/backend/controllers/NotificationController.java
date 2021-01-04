package com.scrumosome.backend.controllers;

import java.util.List;

import com.scrumosome.backend.models.Notification;
import com.scrumosome.backend.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "rest/notification")
@CrossOrigin
public class NotificationController {


    @Autowired
    NotificationRepository notificationRepository;

    @PostMapping("/add")
    public Notification add(@RequestBody Notification notification){
        notificationRepository.save(notification);
        return notification;
    }

    @GetMapping("/getAll")
    public List<Notification> getAll(){
        List<Notification> notifications = notificationRepository.findAll();
        return notifications;
    }
    
}