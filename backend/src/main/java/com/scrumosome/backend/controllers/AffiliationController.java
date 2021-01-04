package com.scrumosome.backend.controllers;

import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.Account;
import com.scrumosome.backend.models.Affiliation;
import com.scrumosome.backend.models.Notification;
import com.scrumosome.backend.models.NotificationType;
import com.scrumosome.backend.models.Project;
import com.scrumosome.backend.repository.AffiliationRepository;
import com.scrumosome.backend.repository.NotificationRepository;
import com.scrumosome.backend.repository.NotificationTypeRepository;
import com.scrumosome.backend.repository.ProjectRepository;
import com.scrumosome.backend.repository.WorkSpaceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/affiliation")
@CrossOrigin
public class AffiliationController {

    @Autowired
    AffiliationRepository affiliationRepository;

    @Autowired
    WorkSpaceRepository workSpaceRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    NotificationTypeRepository notificationTypeRepository;

    @Autowired
    ProjectRepository projectRepository;

    
    @GetMapping("/find/{id}")
    public Optional<Affiliation> findById(@PathVariable Integer id ){
        return affiliationRepository.findById(id);
    }

    @GetMapping("/all")
    public List<Affiliation> findAll(){
        return affiliationRepository.findAll();
    }

    @DeleteMapping("/del/{id}")
    public String del(@PathVariable Integer id ){
        affiliationRepository.deleteById(id);
        return "success";
    }

    @PostMapping("/add")
    public Affiliation add(@RequestBody Affiliation affiliation){
        affiliationRepository.save(affiliation);
        return affiliation;
    }

    @PostMapping("/renameWs")
    public Affiliation renameWs(@RequestBody Affiliation affiliation){
        String oldName = workSpaceRepository.findByWorkSpacesIdIn(affiliation.getWorkSpace().getId_work_space()).getName();
        affiliationRepository.save(affiliation);
        Account notifyer = affiliation.getAccount();
        NotificationType notificationType = notificationTypeRepository.find(4);
        String message = "The admin renamed " + oldName + " to " + affiliation.getWorkSpace().getName();
        String link = "http://localhost:4200/platform/browse/workspace";
        List<Affiliation> affiliations = affiliationRepository.findByWorkSpace(affiliation.getWorkSpace().getId_work_space());
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

        return affiliation;
    }

    @GetMapping("/findByAccountAndProject/{idUser}/{idProject}")
    public Affiliation findByAccountAndProject(@PathVariable Integer idUser, @PathVariable Integer idProject){

        Project project = projectRepository.find(idProject);
        Affiliation affiliation = null;
        if(project != null) {
            affiliation = affiliationRepository.findByAccountAndWs(idUser, project.getWorkSpace().getId_work_space());
            return affiliation;
        }
        return affiliation;
    }

    @PostMapping("/quit")
    public Affiliation quit(@RequestBody Affiliation affiliation){
        affiliationRepository.save(affiliation);
        return affiliation;
    }

    @GetMapping("/findByAccount/{id}")
    public List<Affiliation> findByAccount(@PathVariable Integer id){
        return affiliationRepository.findByAccount(id);
    }

    @GetMapping("/findByAccountAndWs/{id_account}/{id_ws}")
    public Affiliation findByAccountAndWs(@PathVariable Integer id_account, @PathVariable Integer id_ws){
        return affiliationRepository.findByAccountAndWs(id_account, id_ws);
    }

    @GetMapping("/searchByAdmin/{id}")
    public List<Affiliation> searchByAdmin(@PathVariable Integer id){
        return affiliationRepository.getByAdmin(id);
    }

    @GetMapping("/workspaceMembers/{id}")
    public List<Affiliation> workspaceMembers(@PathVariable Integer id){
        return affiliationRepository.workspaceMembers(id);
    }

    @GetMapping("/searchByWsAndRole/{idWs}/{role}")
    public List<Affiliation> searchByWsAndRole(@PathVariable Integer idWs, @PathVariable String role){
        return affiliationRepository.searchByWsAndRole(idWs, role);
    }

    
}