package com.scrumosome.backend.controllers;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.Account;
import com.scrumosome.backend.models.Affiliation;
import com.scrumosome.backend.models.Notification;
import com.scrumosome.backend.models.NotificationType;
import com.scrumosome.backend.models.WorkSpace;
import com.scrumosome.backend.repository.AccountRepository;
import com.scrumosome.backend.repository.AffiliationRepository;
import com.scrumosome.backend.repository.NotificationRepository;
import com.scrumosome.backend.repository.NotificationTypeRepository;
import com.scrumosome.backend.repository.WorkSpaceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/rest/workSpace")
public class WorkSpaceController {
    

    @Autowired
    WorkSpaceRepository workSpaceRepository;

    @Autowired
    AffiliationRepository affiliationRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    NotificationTypeRepository notificationTypeRepository;

    @GetMapping("/getAll")
    public List<WorkSpace> getAll(){
        return workSpaceRepository.findAll();
    }

    @GetMapping("/getOne/{id}")
    public Optional<WorkSpace> getOne(@PathVariable  Integer id){
        return workSpaceRepository.findById(id);
    }

    @GetMapping("/getByName/{name}")
    public WorkSpace getByName(@PathVariable String name){
        return workSpaceRepository.findByName(name);
    }

    @GetMapping("/save/{id_user}/{workspace_name}/{logo}")
    public Affiliation save(@PathVariable String id_user, @PathVariable String workspace_name, @PathVariable String logo){

        Timestamp creation_date = new Timestamp(System.currentTimeMillis());
        WorkSpace workSpace = new WorkSpace(null, workspace_name, creation_date, logo, "active");
        workSpace = workSpaceRepository.save(workSpace);
        Account account = accountRepository.findbyIdandStatus(Integer.parseInt(id_user));
        Affiliation affiliation = new Affiliation(null, account, workSpace, "admin", true);
        affiliation = affiliationRepository.save(affiliation);
        return affiliation;
    }

    // // Main to get all the ws and filter them in the angular app
    // @GetMapping("/findByAffiliation/getAll/{id}")
    // public List<WorkSpaceAffiliation> getAllAffiliation(@PathVariable Integer id){

    //     List<Affiliation> affiList = affiliationRepository.findByAccount(id);

    //     List<WorkSpaceAffiliation> wa = new ArrayList<WorkSpaceAffiliation>();

    //     for (Affiliation aff : affiList) {
    //         WorkSpaceAffiliation workSpaceAffiliation = new WorkSpaceAffiliation(
    //                                                     workSpaceRepository.findByWorkSpacesIdIn(aff.getId_work_space()), aff);
    //         wa.add(workSpaceAffiliation);
    //     }

    //     return wa;
    // }

    

    @GetMapping("/archive/{id}/{id_notifyer}")
    public Integer archive(@PathVariable Integer id, @PathVariable Integer id_notifyer){
        String name = workSpaceRepository.findByWorkSpacesIdIn(id).getName();
        Account notifyer = accountRepository.findbyIdandStatus(id_notifyer);
        NotificationType notificationType = notificationTypeRepository.find(4);
        String message = "The admin has closed the workspace:  " + name;
        String link = "http://localhost:4200/platform/browse/workspace";
        List<Affiliation> affiliations = affiliationRepository.findByWorkSpace(id);
        for (Affiliation affiliation2 : affiliations) {
            if(!affiliation2.getRole().equals("admin")) {
                Notification notification = new Notification(null, 
                                                            notificationType, 
                                                            notifyer, 
                                                            affiliation2.getAccount(), 
                                                            message, 
                                                            null, 
                                                            null, 
                                                            link, 
                                                            false);
                notificationRepository.save(notification);
            }
        }
        affiliationRepository.archive(id);
        return workSpaceRepository.archive(id);
    }
   
}