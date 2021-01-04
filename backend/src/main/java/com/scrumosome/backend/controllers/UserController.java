package com.scrumosome.backend.controllers;

import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.Users;
import com.scrumosome.backend.repository.UserRepository;
import com.scrumosome.backend.utils.ProfilePicUpdate;

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
@RequestMapping(value = "rest/users")
public class UserController {

    @Autowired
    UserRepository userRepository;
    
    @PostMapping("/register")
    public Users register(@RequestBody Users user){
        userRepository.save(user);
        return user;
    }

    
    @GetMapping("/find/{id}")
    public Optional<Users> findById(@PathVariable  Integer id){
        return userRepository.findById(id);
    }

    @GetMapping("/findAll")
    public List<Users> findAll(){
        return userRepository.findAll();
    }

    @PostMapping("/updatePic")
    public void updatePic(@RequestBody ProfilePicUpdate pic){
        userRepository.updatePic(pic.getId(), pic.getPicLink(), pic.getExtension());
    }

    @GetMapping("/updateName/{id}/{name}/{lastName}")
    public Integer updateName(@PathVariable  Integer id, @PathVariable  String name, @PathVariable  String lastName){
        return userRepository.updateName(id, name, lastName);
    }

    @GetMapping(value = {"/updateTel/{id}/{tel}", "/updateTel/{id}"})
    public Integer updateTel(@PathVariable  Integer id, @PathVariable(required = false)  String tel){
        return userRepository.updateTel(id, tel);
    }

    @GetMapping(value = {"/updateOrganization/{id}/{org}", "/updateOrganization/{id}"})
    public Integer updateOrganization(@PathVariable  Integer id, @PathVariable(required = false)  String org){
        return userRepository.updateOrganization(id, org);
    }

    @GetMapping(value = {"/updateOccupation/{id}/{occup}", "/updateOccupation/{id}"})
    public Integer updateOccupation(@PathVariable  Integer id, @PathVariable(required = false)  String occup){
        return userRepository.updateOccupation(id, occup);
    }
}