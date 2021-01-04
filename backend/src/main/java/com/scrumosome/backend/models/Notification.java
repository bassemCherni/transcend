package com.scrumosome.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Notification {
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "type")
    private NotificationType type;

    @OneToOne
    @JoinColumn(name = "notifyer")
    private Account notifyer;

    @OneToOne
    @JoinColumn(name = "subject")
    private Account subject;

    private String message;

    @OneToOne
    @JoinColumn(name = "id_work_space")
    private WorkSpace id_work_space;

    @OneToOne
    @JoinColumn(name = "id_project")
    private Project id_project;
    
    private String link;
    private Boolean vued;

    public Notification() {
    }

    public Notification(Integer id, NotificationType type, Account notifyer, Account subject, String message,
            WorkSpace id_work_space, Project id_project, String link, Boolean vued) {
        this.id = id;
        this.type = type;
        this.notifyer = notifyer;
        this.subject = subject;
        this.message = message;
        this.id_work_space = id_work_space;
        this.id_project = id_project;
        this.link = link;
        this.vued = vued;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public Account getNotifyer() {
        return notifyer;
    }

    public void setNotifyer(Account notifyer) {
        this.notifyer = notifyer;
    }

    public Account getSubject() {
        return subject;
    }

    public void setSubject(Account subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public WorkSpace getId_work_space() {
        return id_work_space;
    }

    public void setId_work_space(WorkSpace id_work_space) {
        this.id_work_space = id_work_space;
    }

    public Project getId_project() {
        return id_project;
    }

    public void setId_project(Project id_project) {
        this.id_project = id_project;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public Boolean getVued() {
        return vued;
    }

    public void setVued(Boolean vued) {
        this.vued = vued;
    }

    @Override
    public String toString() {
        return "Notification [id=" + id + ", id_project=" + id_project + ", id_work_space=" + id_work_space + ", link="
                + link + ", message=" + message + ", notifyer=" + notifyer + ", subject=" + subject + ", type=" + type
                + ", vued=" + vued + "]";
    }

    
}