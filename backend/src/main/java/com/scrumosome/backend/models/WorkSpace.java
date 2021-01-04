package com.scrumosome.backend.models;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="work_space")
public class WorkSpace {

    @Id
    @Column(name="id_work_space")
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id_work_space;

    @Column(name="name")
    private String name;

    @Column(name="creation_date")
    private Timestamp creation_date;

    @Column(name="logo")
    private String logo;

    @Column(name="status")
    private String status;

    public WorkSpace() {
    }

    public WorkSpace(Integer id_work_space, String name, Timestamp creation_date, String logo, String status) {
        this.id_work_space = id_work_space;
        this.name = name;
        this.creation_date = creation_date;
        this.logo = logo;
        this.status = status;
    }

    public Integer getId_work_space() {
        return id_work_space;
    }

    public void setId_work_space(Integer id_work_space) {
        this.id_work_space = id_work_space;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Timestamp creation_date) {
        this.creation_date = creation_date;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "WorkSpace [creation_date=" + creation_date + ", id_work_space=" + id_work_space + ", logo=" + logo
                + ", name=" + name + ", status=" + status + "]";
    }

   
    
    

}