package com.scrumosome.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="affiliation")
public class Affiliation {
    
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "id_account")
    private Account account;
    @ManyToOne()
    @JoinColumn(name = "id_work_space")
    private WorkSpace workSpace;
    private String role;
    private Boolean active;

    public Affiliation() {
    }

    public Affiliation(Integer id, Account account, WorkSpace workSpace, String role, Boolean active) {
        this.id = id;
        this.account = account;
        this.workSpace = workSpace;
        this.role = role;
        this.active = active;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public WorkSpace getWorkSpace() {
        return workSpace;
    }

    public void setWorkSpace(WorkSpace workSpace) {
        this.workSpace = workSpace;
    }

    @Override
    public String toString() {
        return "Affiliation [account=" + account + ", active=" + active + ", id=" + id + ", role=" + role
                + ", workSpace=" + workSpace + "]";
    }

   

    
}