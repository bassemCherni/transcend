package com.scrumosome.backend.controllers;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import com.scrumosome.backend.models.Account;
import com.scrumosome.backend.models.Affiliation;
import com.scrumosome.backend.models.Issue;
import com.scrumosome.backend.models.Membership;
import com.scrumosome.backend.models.Notification;
import com.scrumosome.backend.models.NotificationType;
import com.scrumosome.backend.models.Sprint;
import com.scrumosome.backend.repository.AccountRepository;
import com.scrumosome.backend.repository.AffiliationRepository;
import com.scrumosome.backend.repository.IssueRepository;
import com.scrumosome.backend.repository.MembershipRepository;
import com.scrumosome.backend.repository.NotificationRepository;
import com.scrumosome.backend.repository.NotificationTypeRepository;
import com.scrumosome.backend.repository.SprintRepository;

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
@RequestMapping("/rest/Sprint")
public class SprintController {

    @Autowired
    SprintRepository sprintRepository;

    @Autowired
    IssueRepository issueRepository;

    @Autowired
    MembershipRepository membershipRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AffiliationRepository affiliationRepository;

    @Autowired
    NotificationTypeRepository notificationTypeRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @GetMapping("/getAll")
    public List<Sprint> getAll(){
        return sprintRepository.findAll();
    }

    @GetMapping("/getOne/{id}")
    public Optional<Sprint> findById(@PathVariable  Integer id){
        return sprintRepository.findById(id);
    }

    @PostMapping("/save/{idSm}")
    public Sprint save(@PathVariable  Integer idSm, @RequestBody Sprint sprint){

        List<Membership> memberships = membershipRepository.findSpecificProject(sprint.getProject().getId_project());
        Affiliation affiliation;
        // product owner
        Account po = null;
        Account sm = accountRepository.findbyIdandStatus(idSm);
        // scrum master of the project
        for (Membership membership : memberships) {
            affiliation = affiliationRepository.findByAccountAndWs(membership.getAccount().getId_account(),
                                                                   membership.getProject().getWorkSpace().getId_work_space());
            if (affiliation.getRole().equals("p.o")) {
                po = affiliation.getAccount();
            }
        }

        // date of creation
        Timestamp creation_date = new Timestamp(System.currentTimeMillis());

        // notification
        NotificationType notificationType = notificationTypeRepository.find(2);
        String message;
        String link = "http://localhost:4200/platform/projects/" + sprint.getProject().getId_project() + "/backlog";

        // if its sprint creation
        if(sprint.getId_sprint() == null){
            sprint.setCreation_date(creation_date);
            sprint.setStarting_date(null);
            sprint.setDue_date(null);
            sprint.setStatus("pending");
            sprint.setDelaye(null);

            sprint = sprintRepository.save(sprint);

            // saving notif
            if (po != null) {
                message = sm.getId_user().getUser_name() + " created sprint: " + sprint.getTitle();
                Notification notification = new Notification(null, notificationType, sm, po, message, null, null, link,
                        false);
                notificationRepository.save(notification);
            }
        } else {
            sprint = sprintRepository.save(sprint);

            // saving notif
            if (po != null) {
                message = sm.getId_user().getUser_name() + " updated sprint: " + sprint.getTitle();
                Notification notification = new Notification(null, notificationType, sm, po, message, null, null, link,
                        false);
                notificationRepository.save(notification);
            }

        }

        return sprint;
    }

    @PostMapping("/completeSprint/{idSm}")
    public Sprint completeSprint(@PathVariable  Integer idSm, @RequestBody Sprint sprint){

        List<Membership> memberships = membershipRepository.findSpecificProject(sprint.getProject().getId_project());
        Affiliation affiliation;
        // product owner
        Account po = null;
        Account sm = accountRepository.findbyIdandStatus(idSm);
        // scrum master of the project
        for (Membership membership : memberships) {
            affiliation = affiliationRepository.findByAccountAndWs(membership.getAccount().getId_account(),
                                                                   membership.getProject().getWorkSpace().getId_work_space());
            if (affiliation.getRole().equals("p.o")) {
                po = affiliation.getAccount();
            }
        }

        // notification
        NotificationType notificationType = notificationTypeRepository.find(2);
        String message;
        String link = "http://localhost:4200/platform/projects/" + sprint.getProject().getId_project() + "/backlog";

        if (po != null) {
            message = sm.getId_user().getUser_name() + " created sprint: " + sprint.getTitle();
            Notification notification = new Notification(null, notificationType, sm, po, message, null, null, link,
                    false);
            notificationRepository.save(notification);
        }
        
        // delay state of the sprint
        Timestamp toDay = new Timestamp(System.currentTimeMillis());
        if(sprint.getDue_date().after(toDay)) {
            sprint.setDelaye(false);
        } else {
            sprint.setDelaye(true);
        }

        // closing sprint
        sprint.setStatus("done");
        sprint = sprintRepository.save(sprint);
        
        List<Issue> issues = issueRepository.findBySprint(sprint.getId_sprint());
        Integer maxIndex = issueRepository.maxIndex(sprint.getProject().getId_project());
        if (maxIndex == null) {
            maxIndex = 0;
        }

        for (Issue issue : issues) {
            if (!issue.getStatus().equals("done")) {
                maxIndex++;
                issue.setSprint(null);
                issue.setAssignee(null);
                issue.setIndexer(maxIndex);
                issueRepository.save(issue);
            }            
        }
        

        return sprint;
    }

    @PostMapping("/deleteSprint/{idSm}")
    public void deleteSprint(@PathVariable  Integer idSm, @RequestBody Sprint sprint){

        List<Membership> memberships = membershipRepository.findSpecificProject(sprint.getProject().getId_project());
        Affiliation affiliation;
        // product owner
        Account po = null;
        Account sm = accountRepository.findbyIdandStatus(idSm);
        // scrum master of the project
        for (Membership membership : memberships) {
            affiliation = affiliationRepository.findByAccountAndWs(membership.getAccount().getId_account(),
                                                                   membership.getProject().getWorkSpace().getId_work_space());
            if (affiliation.getRole().equals("p.o")) {
                po = affiliation.getAccount();
            }
        }

        // notification
        NotificationType notificationType = notificationTypeRepository.find(2);
        String message;
        String link = "http://localhost:4200/platform/projects/" + sprint.getProject().getId_project() + "/backlog";

        if (po != null) {
            message = sm.getId_user().getUser_name() + " deleted sprint: " + sprint.getTitle();
            Notification notification = new Notification(null, notificationType, sm, po, message, null, null, link,
                    false);
            notificationRepository.save(notification);
        }

        List<Issue> issues = issueRepository.findBySprint(sprint.getId_sprint());
        for (Issue issue : issues) {
            issueRepository.delete(issue);
        }
        sprintRepository.delete(sprint);
    }

    @GetMapping("/getByProject/{id}")
    public List<Sprint> findByIdProject (@PathVariable  Integer id){
        return sprintRepository.findByProject(id);
    }

    @GetMapping("/allSprints/{id}")
    public List<Sprint> allSprints (@PathVariable  Integer id){
        return sprintRepository.allSprints(id);
    }

    // to get the active sprint of a project
    @GetMapping("/activeSprint/{id}")
    public Sprint activeSprint (@PathVariable  Integer id){
        return sprintRepository.activeSprint(id);
    }

    @GetMapping("/remainingPoints/{id}")
    public Integer remainingPoints (@PathVariable  Integer id){
        return sprintRepository.remainingPoints(id);
    }

}