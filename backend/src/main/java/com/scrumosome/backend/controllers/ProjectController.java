package com.scrumosome.backend.controllers;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.Account;
import com.scrumosome.backend.models.Affiliation;
import com.scrumosome.backend.models.Membership;
import com.scrumosome.backend.models.Notification;
import com.scrumosome.backend.models.NotificationType;
import com.scrumosome.backend.models.Project;
import com.scrumosome.backend.repository.AccountRepository;
import com.scrumosome.backend.repository.AffiliationRepository;
import com.scrumosome.backend.repository.MembershipRepository;
import com.scrumosome.backend.repository.NotificationRepository;
import com.scrumosome.backend.repository.NotificationTypeRepository;
import com.scrumosome.backend.repository.ProjectRepository;

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
@RequestMapping("/rest/project")
public class ProjectController {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    MembershipRepository membershipRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    NotificationTypeRepository notificationTypeRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @Autowired
    AffiliationRepository affiliationRepository;

    @GetMapping("/getAll")
    public List<Project> getAll(){
        return projectRepository.findAll();
    }

    @GetMapping("/getOne/{id}")
    public Optional<Project> findById(@PathVariable  Integer id){
        return projectRepository.findById(id);
    }

    @PostMapping("/save")
    public String save(@RequestBody Project Project){
        projectRepository.save(Project);
        return "success";
    }

    @GetMapping("/rename/{id}/{name}")
    public Project rename(@PathVariable  Integer id, @PathVariable  String name){
        Project p = projectRepository.find(id);
        p.setTitle(name);
        return projectRepository.save(p);
    }

    @GetMapping("/projectsByWs/{idWs}")
    public List<Project> projectsByWs(@PathVariable  Integer idWs){
        return projectRepository.findByWorkSpacesIdIn(idWs);
    }


    @GetMapping("/archive/{id_account}/{idProject}")
    public Project archive(@PathVariable  Integer id_account, @PathVariable  Integer idProject){
        List<Membership> memberships = membershipRepository.findSpecificProject(idProject);
        Project p = projectRepository.find(idProject);
        p.setArchived(true);
        projectRepository.save(p);
        Account notifyer = accountRepository.findbyIdandStatus(id_account);
        NotificationType notificationType = notificationTypeRepository.find(5);
        String message = notifyer.getId_user().getUser_name() + " has deleted the project: " + p.getTitle();
        String link = "http://localhost:4200/platform/browse/workspace/" + p.getWorkSpace().getId_work_space();
        for (Membership membership : memberships) {
            membership.setActive(false);
            Timestamp endDate = new Timestamp(System.currentTimeMillis());
            membership.setEnd_date(endDate);
            membershipRepository.save(membership);
            
            Notification notification = new Notification(null, 
                                                        notificationType, 
                                                        notifyer, 
                                                        membership.getAccount(),
                                                        message, 
                                                        null, 
                                                        null, 
                                                        link, 
                                                        false);
            notificationRepository.save(notification);
            
        }
        return p;
    }

    @PostMapping("/createProject/{id_creator}/{id_sm}")
    public Project createProject(@PathVariable  Integer id_creator, @PathVariable  Integer id_sm, @RequestBody Project project){
        Timestamp creation_date = new Timestamp(System.currentTimeMillis());
        project.setCreation_date(creation_date);
        Project p = projectRepository.save(project);
        Timestamp startDate = new Timestamp(System.currentTimeMillis());

        Affiliation affiliation = affiliationRepository.adminAffiliation(p.getWorkSpace().getId_work_space());
        Account po = accountRepository.findbyIdandStatus(id_creator);
        Account sm = accountRepository.findbyIdandStatus(id_sm);
        Account admin = affiliation.getAccount();
        Membership pOmembership = new Membership(null, p, po, false, true, startDate, null);
        Membership sMmembership = new Membership(null, p, sm, false, true, startDate, null);
        Membership adminMmembership = new Membership(null, p, admin, false, true, startDate, null);

        membershipRepository.save(pOmembership);
        membershipRepository.save(sMmembership);
        membershipRepository.save(adminMmembership);

        NotificationType notificationType = notificationTypeRepository.find(5);
        String message = po.getId_user().getUser_name() + " assigned you the scrum master of the project: " + p.getTitle();
        String link = "http://localhost:4200/platform/browse/workspace/" + p.getWorkSpace().getId_work_space();
            
        Notification notification = new Notification(null, 
                                                    notificationType, 
                                                    po, 
                                                    sm,
                                                    message, 
                                                    null, 
                                                    null, 
                                                    link, 
                                                    false);
        notificationRepository.save(notification);
        return p;
    }


    
}