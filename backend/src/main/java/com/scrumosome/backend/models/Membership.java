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
@Table(name = "membership")
public class Membership {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "id_project")
    private Project project;
    @ManyToOne
    @JoinColumn(name = "id_account")
    private Account account;
    private Boolean favorite;
    private Boolean active;
    private Timestamp start_date;
    private Timestamp end_date;

    public Membership() {
    }

    public Membership(Integer id, Project project, Account account, Boolean favorite, Boolean active,
            Timestamp start_date, Timestamp end_date) {
        this.id = id;
        this.project = project;
        this.account = account;
        this.favorite = favorite;
        this.active = active;
        this.start_date = start_date;
        this.end_date = end_date;
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

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Timestamp getStart_date() {
        return start_date;
    }

    public void setStart_date(Timestamp start_date) {
        this.start_date = start_date;
    }

    public Timestamp getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Timestamp end_date) {
        this.end_date = end_date;
    }

    @Override
    public String toString() {
        return "Membership [account=" + account + ", active=" + active + ", end_date=" + end_date + ", favorite="
                + favorite + ", id=" + id + ", project=" + project + ", start_date=" + start_date + "]";
    }

    
}