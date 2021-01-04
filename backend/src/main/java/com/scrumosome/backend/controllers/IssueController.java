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
import com.scrumosome.backend.models.Project;
import com.scrumosome.backend.repository.AccountRepository;
import com.scrumosome.backend.repository.AffiliationRepository;
import com.scrumosome.backend.repository.IssueRepository;
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
@RequestMapping("/rest/Issue")
public class IssueController {

    @Autowired
    IssueRepository issueRepository;

    @Autowired
    MembershipRepository membershipRepository;

    @Autowired
    ProjectRepository projectRepository; 

    @Autowired
    AffiliationRepository affiliationRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    NotificationTypeRepository notificationTypeRepository;

    @Autowired
    NotificationRepository notificationRepository;

    @GetMapping("/getAll")
    public List<Issue> getAll() {
        return issueRepository.findAll();
    }

    @GetMapping("/getOne/{id}")
    public Optional<Issue> findById(@PathVariable Integer id) {
        return issueRepository.findById(id);
    }

    @PostMapping("/save/{id_creator}")
    public Issue save(@PathVariable Integer id_creator, @RequestBody Issue issue) {
        List<Membership> memberships = membershipRepository.findSpecificProject(issue.getProject().getId_project());
        Affiliation affiliation;
        // product owner
        Account po = accountRepository.findbyIdandStatus(id_creator);
        Account sm = null;
        // scrum master of the project
        for (Membership membership : memberships) {
            affiliation = affiliationRepository.findByAccountAndWs(membership.getAccount().getId_account(),
                    membership.getProject().getWorkSpace().getId_work_space());
            if (affiliation.getRole().equals("s.m")) {
                sm = affiliation.getAccount();
            }
        }
        // index of the issue
        Integer index = issueRepository.maxIndex(issue.getProject().getId_project());
        if (index == null) {
            index = 0;
        }
        index++;
        // date of creation
        Timestamp creation_date = new Timestamp(System.currentTimeMillis());

        // notification
        NotificationType notificationType = notificationTypeRepository.find(1);
        String message;
        String link = "http://localhost:4200/platform/projects/" + issue.getProject().getId_project() + "/backlog";

        // creation or update
        if (issue.getId_issue() != null) {
            issue = issueRepository.save(issue);

            // saving notif
            if (sm != null) {
                message = po.getId_user().getUser_name() + " updated issue: " + issue.getTitle();
                Notification notification = new Notification(null, notificationType, po, sm, message, null, null, link,
                        false);
                notificationRepository.save(notification);
            }

        } else {
            issue.setCreation_date(creation_date);
            issue.setStatus("to do");
            issue.setVued(false);
            issue.setIndexer(index);
            issue.setLast_modified(creation_date);

            issue = issueRepository.save(issue);

            // saving notif
            if (sm != null) {
                message = po.getId_user().getUser_name() + " created issue: " + issue.getTitle();
                Notification notification = new Notification(null, notificationType, po, sm, message, null, null, link,
                        false);
                notificationRepository.save(notification);
            }

        }

        // starting the project after the add of the first issue
        Project p = issue.getProject();
        p.setStatus("on going");
        p = projectRepository.save(p);
        issue.setProject(p);
        return issue;
    }

    @PostMapping("/delete/{id_creator}")
    public void delete(@PathVariable Integer id_creator, @RequestBody Issue issue) {
        List<Membership> memberships = membershipRepository.findSpecificProject(issue.getProject().getId_project());
        Affiliation affiliation;
        // product owner
        Account po = accountRepository.findbyIdandStatus(id_creator);
        Account assignee = issue.getAssignee();
        Account sm = null;
        // scrum master of the project
        for (Membership membership : memberships) {
            affiliation = affiliationRepository.findByAccountAndWs(membership.getAccount().getId_account(),
                    membership.getProject().getWorkSpace().getId_work_space());
            if (affiliation.getRole().equals("s.m")) {
                sm = affiliation.getAccount();
            }
        }

        NotificationType notificationType = notificationTypeRepository.find(1);
        String message = po.getId_user().getUser_name() + " deleted issue: " + issue.getTitle();
        String link = "http://localhost:4200/platform/projects/" + issue.getProject().getId_project() + "/backlog";
        // notif to s.m
        Notification notifSM = new Notification(null, notificationType, po, sm, message, null, null, link, false);
        // notif to dev
        Notification notifDEV = new Notification(null, notificationType, po, assignee, message, null, null, link,
                false);
        if (issue.getSprint() != null) {
            Integer index = issue.getIndexer();
            issueRepository.delete(issue);
            List<Issue> issues = issueRepository.findBySprint(issue.getSprint().getId_sprint());
            for (Issue issue2 : issues) {
                if (issue2.getIndexer() > index) {
                    issueRepository.updateIndex(issue2.getId_issue(), issue2.getIndexer() - 1);
                }
            }
        } else {
            Integer index = issue.getIndexer();
            issueRepository.delete(issue);
            List<Issue> issues = issueRepository.findByProject(issue.getProject().getId_project());
            for (Issue issue2 : issues) {
                if (issue2.getIndexer() > index) {
                    issueRepository.updateIndex(issue2.getId_issue(), issue2.getIndexer() - 1);
                }
            }
        }

        if (sm != null) {
            notificationRepository.save(notifSM);
        }
        if (assignee != null) {
            notificationRepository.save(notifDEV);
        }

    }

    @PostMapping("/assigne/{id}")
    public Issue updateIndex(@PathVariable Integer id, @RequestBody Issue issue) {

        Account po = accountRepository.findbyIdandStatus(id);
        Account assignee = issue.getAssignee();

        if(assignee != null) {
            NotificationType notificationType = notificationTypeRepository.find(1);
            String message = po.getId_user().getUser_name() + " assigned you to issue: " + issue.getTitle();
            String link = "http://localhost:4200/platform/projects/" + issue.getProject().getId_project() + "/backlog";
            Notification notifDEV = new Notification(null, notificationType, po, assignee, message, null, null, link,
                false);
            notificationRepository.save(notifDEV);
        }
        return issueRepository.save(issue);
    }

    @PostMapping("/simpleUpdate")
    public Issue simpleUpdate(@RequestBody Issue issue) {
        return issueRepository.save(issue);
    }

    @PostMapping("/updateStatus")
    public Issue updateStatus(@RequestBody Issue issue) {
        List<Membership> memberships = membershipRepository.findSpecificProject(issue.getProject().getId_project());
        Affiliation affiliation;
        Account sm = null;
        Optional<Issue> old = issueRepository.findById(issue.getId_issue());
        // scrum master of the project
        for (Membership membership : memberships) {
            affiliation = affiliationRepository.findByAccountAndWs(membership.getAccount().getId_account(),
                    membership.getProject().getWorkSpace().getId_work_space());
            if (affiliation.getRole().equals("s.m")) {
                sm = affiliation.getAccount();
            }
        }

        if(sm != null && !old.get().getStatus().equals(issue.getStatus())) {
            NotificationType notificationType = notificationTypeRepository.find(1);
            String message = issue.getAssignee().getId_user().getUser_name() + " updated " + issue.getTitle() + " to " + issue.getStatus();
            String link = "http://localhost:4200/platform/projects/" + issue.getProject().getId_project() + "/backlog";
            Notification notif = new Notification(null, notificationType, issue.getAssignee(), sm, message, null, null, link,
                false);
            notificationRepository.save(notif);
        }
        // date of update
        Timestamp update = new Timestamp(System.currentTimeMillis());
        issue.setLast_modified(update);
        return issueRepository.save(issue);
    }

    @GetMapping("/getByProject/{id}")
    public List<Issue> findByIdProject(@PathVariable Integer id) {
        return issueRepository.findByProject(id);
    }

    @GetMapping("/findBySprintAndStatus/{id}/{status}")
    public List<Issue> findBySprintAndStatus(@PathVariable Integer id, @PathVariable String status) {
        return issueRepository.findBySprintAndStatus(id, status);
    }

    @GetMapping("/findBySprintStatusAssignee/{id}/{status}/{idAssignee}")
    public List<Issue> findBySprintAndStatus(@PathVariable Integer id, @PathVariable String status, @PathVariable Integer idAssignee) {
        return issueRepository.findBySprintStatusAssignee(id, idAssignee, status);
    }

    @GetMapping("/findByEpic/{id}")
    public List<Issue> findByEpic(@PathVariable Integer id) {
        return issueRepository.findByEpic(id);
    }

    @GetMapping("/getBySprint/{id}")
    public List<Issue> findBySprint(@PathVariable Integer id) {
        return issueRepository.findBySprint(id);
    }

    @GetMapping("/updateIndex/{id}/{index}")
    public void updateIndex(@PathVariable Integer id, @PathVariable Integer index) {
        issueRepository.updateIndex(id, index);
    }

    @GetMapping("/setSprint/{id}/{idSprint}")
    public void setSprint(@PathVariable Integer id, @PathVariable(required = false) Integer idSprint) {
        issueRepository.setSprint(id, idSprint);
    }

    @GetMapping("/setSprint/{id}")
    public void setToBacklog(@PathVariable Integer id) {
        issueRepository.setSprint(id, null);
    }
}