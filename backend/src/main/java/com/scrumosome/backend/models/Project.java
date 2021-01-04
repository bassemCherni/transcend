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
@Table(name = "project")
public class Project {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id_project;
    @ManyToOne
    @JoinColumn(name = "id_work_space")
    private WorkSpace workSpace;
    private String title;
    private String descreption;
    private Timestamp creation_date;
    private Timestamp starting_date;
    private Timestamp due_date;
    private String status;
    private Boolean archived;
    private String logo;

    public Project() {
    }

    public Project(Integer id_project, WorkSpace workSpace, String title, String descreption, Timestamp creation_date,
            Timestamp starting_date, Timestamp due_date, String status, Boolean archived, String logo) {
        this.id_project = id_project;
        this.workSpace = workSpace;
        this.title = title;
        this.descreption = descreption;
        this.creation_date = creation_date;
        this.starting_date = starting_date;
        this.due_date = due_date;
        this.status = status;
        this.archived = archived;
        this.logo = logo;
    }

    public Integer getId_project() {
        return id_project;
    }

    public void setId_project(Integer id_project) {
        this.id_project = id_project;
    }

    public WorkSpace getWorkSpace() {
        return workSpace;
    }

    public void setWorkSpace(WorkSpace workSpace) {
        this.workSpace = workSpace;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescreption() {
        return descreption;
    }

    public void setDescreption(String descreption) {
        this.descreption = descreption;
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

    public Boolean isArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    @Override
    public String toString() {
        return "Project [archived=" + archived + ", creation_date=" + creation_date + ", descreption=" + descreption
                + ", due_date=" + due_date + ", id_project=" + id_project + ", logo=" + logo + ", starting_date="
                + starting_date + ", status=" + status + ", title=" + title + ", workSpace=" + workSpace + "]";
    }

   

}