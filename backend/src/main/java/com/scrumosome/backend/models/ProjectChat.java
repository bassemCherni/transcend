package com.scrumosome.backend.models;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "project_chat")
public class ProjectChat {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "id_project")
    private Project project;
    @ManyToOne
    @JoinColumn(name = "id_sender")
    private Account sender;
    private String message;
    private Timestamp creation_date;

    public ProjectChat() {
    }

    public ProjectChat(Integer id, Project project, Account sender, String message, Timestamp creation_date) {
        this.id = id;
        this.project = project;
        this.sender = sender;
        this.message = message;
        this.creation_date = creation_date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Account getSender() {
        return sender;
    }

    public void setSender(Account sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Timestamp creation_date) {
        this.creation_date = creation_date;
    }

    @Override
    public String toString() {
        return "ProjectChat [creation_date=" + creation_date + ", id=" + id + ", message=" + message + ", project="
                + project + ", sender=" + sender + "]";
    }

   


}