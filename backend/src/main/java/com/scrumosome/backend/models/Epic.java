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
@Table(name = "epic")
public class Epic {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id_epic;
    @ManyToOne
    @JoinColumn(name = "id_project")
    private Project project;
    private String title;
    private String description;
    private Timestamp creation_date;
    private String status;

    public Epic() {
    }

    public Epic(Integer id_epic, Project project, String title, String description, Timestamp creation_date,
            String status) {
        this.id_epic = id_epic;
        this.project = project;
        this.title = title;
        this.description = description;
        this.creation_date = creation_date;
        this.status = status;
    }

    public Integer getId_epic() {
        return id_epic;
    }

    public void setId_epic(Integer id_epic) {
        this.id_epic = id_epic;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Epic [creation_date=" + creation_date + ", description=" + description + ", id_epic=" + id_epic
                + ", project=" + project + ", status=" + status + ", title=" + title + "]";
    }

    
}