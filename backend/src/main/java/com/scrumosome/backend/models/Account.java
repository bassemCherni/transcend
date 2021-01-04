package com.scrumosome.backend.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="account")
public class Account {

    @Id
    @Column(name="id_account")
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id_account;

    @OneToOne
    @JoinColumn(name = "id_user")
    private Users user;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="status")
    private String status;

    @Column(name="admin")
    private Boolean admin;
    

    public Account() {
    }

    public Account(Integer id_account, Users user, String email, String password, String status, Boolean admin) {
        this.id_account = id_account;
        this.user = user;
        this.email = email;
        this.password = password;
        this.status = status;
        this.admin = admin;
    }

    public Integer getId_account() {
        return id_account;
    }

    public void setId_account(Integer id_account) {
        this.id_account = id_account;
    }

    public Users getId_user() {
        return user;
    }

    public void setId_user(Users user) {
        this.user = user;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getAdmin() {
        return admin;
    }

    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    @Override
    public String toString() {
        return "Account [admin=" + admin + ", email=" + email + ", id_account=" + id_account + ", user=" + user.toString()
                + ", password=" + password + ", status=" + status + "]";
    }

       
}