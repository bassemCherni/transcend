package com.scrumosome.backend.controllers;


import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.Account;
import com.scrumosome.backend.repository.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "rest/account")
@CrossOrigin
public class AccountController {

    @Autowired
    AccountRepository accountRepository;

    @PostMapping("/register")
    public Account register(@RequestBody Account account){
        accountRepository.save(account);
        return account;
    }

    @GetMapping("/byEmail/{email}")
    public Account findByEmail(@PathVariable String email){
        return accountRepository.findByEmail(email);
    }

    @GetMapping("/find/{id}")
    public Optional<Account> findById(@PathVariable  Integer id){
        return accountRepository.findById(id);
    }

    @GetMapping("/findActive/{id}")
    public Account findbyIdandStatus(@PathVariable  Integer id){
        return accountRepository.findbyIdandStatus(id);
    }

    @GetMapping("/findAll")
    public List<Account> findAll(){
        return accountRepository.findAll();
    }

    @GetMapping("/findAllActive")
    public List<Account> findAllActive(){
        return accountRepository.findByStatus("active");
    }

    @GetMapping("/connect/{email}")
    public Account findByEmailAndStatus(@PathVariable String email){
        return accountRepository.findByEmailAndStatus(email, "active");
    }

    @GetMapping("/search/{id}/{search}")
    public List<Account> searchAccount(@PathVariable  Integer id, @PathVariable String search){
        return accountRepository.searchAccount(id, search);
    }

    @GetMapping("/searchToAddToWs/{id}/{search}")
    public List<Account> searchToAddToWs(@PathVariable  Integer id, @PathVariable String search){
        return accountRepository.searchToAddToWs(id, search);
    }
    
    @GetMapping("/archive/{id}")
    public String archiveAccount(@PathVariable Integer id){
        accountRepository.archiveAccount(id); 
        return "archived";
    }

   

}