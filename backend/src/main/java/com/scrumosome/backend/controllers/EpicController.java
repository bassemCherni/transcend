package com.scrumosome.backend.controllers;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.Epic;
import com.scrumosome.backend.repository.EpicRepository;

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
@RequestMapping("/rest/Epic")
public class EpicController {

    @Autowired
    EpicRepository epicRepository;

    @GetMapping("/getAll")
    public List<Epic> getAll(){
        return epicRepository.findAll();
    }

    @GetMapping("/getOne/{id}")
    public Optional<Epic> findById(@PathVariable  Integer id){
        return epicRepository.findById(id);
    }

    @PostMapping("/save")
    public Epic save(@RequestBody Epic epic){

        // epic creation date
        Timestamp creationDate = new Timestamp(System.currentTimeMillis());
        if (epic.getId_epic() == null) {
            epic.setCreation_date(creationDate);
        }        
        return epicRepository.save(epic);
    }

    @GetMapping("/getByProject/{id}")
    public List<Epic> findByIdProject (@PathVariable  Integer id){
        return epicRepository.findByProject(id);
    }

}