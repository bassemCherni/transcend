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
@Table(name = "sprint")
public class Sprint {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id_sprint;
    @ManyToOne
    @JoinColumn(name = "id_project")
    private Project project;
    private String title;
    private String description;
    private Timestamp creation_date;
    private Timestamp starting_date;
    private Timestamp due_date;
    private String status;
    private Boolean delaye;
    
    public Sprint() {
    }

    public Sprint(Integer id_sprint, Project project, String title, String description, Timestamp creation_date,
            Timestamp starting_date, Timestamp due_date, String status, Boolean delaye) {
        this.id_sprint = id_sprint;
        this.project = project;
        this.title = title;
        this.description = description;
        this.creation_date = creation_date;
        this.starting_date = starting_date;
        this.due_date = due_date;
        this.status = status;
        this.delaye = delaye;
    }

    public Integer getId_sprint() {
        return id_sprint;
    }

    public void setId_sprint(Integer id_sprint) {
        this.id_sprint = id_sprint;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Timestamp creation_date) {
        this.creation_date = creation_date;
    }

    public Timestamp getStarting_date() {
        return starting_date;
    }

    public void setStarting_date(Timestamp starting_date) {
        this.starting_date = starting_date;
    }

    public Timestamp getDue_date() {
        return due_date;
    }

    public void setDue_date(Timestamp due_date) {
        this.due_date = due_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getDelaye() {
        return delaye;
    }

    public void setDelaye(Boolean delaye) {
        this.delaye = delaye;
    }

    @Override
    public String toString() {
        return "Sprint [creation_date=" + creation_date + ", delaye=" + delaye + ", description=" + description
                + ", due_date=" + due_date + ", id_sprint=" + id_sprint + ", project=" + project + ", starting_date="
                + starting_date + ", status=" + status + ", title=" + title + "]";
    }

    
}