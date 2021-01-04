package com.scrumosome.backend.utils;

import java.sql.Timestamp;

import com.scrumosome.backend.models.Project;

public class MembershipResponse {

    
    private Integer id;
    private Project project;
    private Integer account;
    private Boolean favorite;
    private Boolean active;
    private Timestamp start_date;
    private Timestamp end_date;

    public MembershipResponse() {
    }

    public MembershipResponse(Integer id, Project project, Integer account, Boolean favorite, Boolean active,
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

    public Integer getAccount() {
        return account;
    }

    public void setAccount(Integer account) {
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
        return "MembershipResponse [account=" + account + ", active=" + active + ", end_date=" + end_date
                + ", favorite=" + favorite + ", id=" + id + ", project=" + project + ", start_date=" + start_date + "]";
    }

    
}