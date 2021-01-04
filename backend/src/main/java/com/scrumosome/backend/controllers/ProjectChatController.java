package com.scrumosome.backend.controllers;

import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.ProjectChat;
import com.scrumosome.backend.repository.ProjectChatRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/rest/ProjectChat")
public class ProjectChatController {

    @Autowired
    ProjectChatRepository projectChatRepository;

    @GetMapping("/getAll")
    public List<ProjectChat> getAll(){
        return projectChatRepository.findAll();
    }

    @GetMapping("/getOne/{id}")
    public Optional<ProjectChat> findById(@PathVariable  Integer id){
        return projectChatRepository.findById(id);
    }

    @PostMapping("/save")
    public String save(@RequestBody ProjectChat projectChat){
        projectChatRepository.save(projectChat);
        return "success";
    }

    @GetMapping("/getOrdered/{id}")
    public List<ProjectChat> getOrdered(@PathVariable  Integer id){
        return projectChatRepository.getOrdered(id);
    }
}