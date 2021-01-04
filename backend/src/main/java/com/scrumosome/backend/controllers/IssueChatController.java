package com.scrumosome.backend.controllers;

import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.IssueChat;
import com.scrumosome.backend.repository.IssueChatRepository;

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
@RequestMapping("/rest/IssueChat")
public class IssueChatController {

    @Autowired
    IssueChatRepository issueChatRepository;

    @GetMapping("/getAll")
    public List<IssueChat> getAll(){
        return issueChatRepository.findAll();
    }

    @GetMapping("/getOne/{id}")
    public Optional<IssueChat> findById(@PathVariable  Integer id){
        return issueChatRepository.findById(id);
    }

    @PostMapping("/save")
    public String save(@RequestBody IssueChat issueChat){
        issueChatRepository.save(issueChat);
        return "success";
    }

    @GetMapping("/getOrdered/{id}")
    public List<IssueChat> getOrdered(@PathVariable  Integer id){
        return issueChatRepository.getOrdered(id);
    }
}