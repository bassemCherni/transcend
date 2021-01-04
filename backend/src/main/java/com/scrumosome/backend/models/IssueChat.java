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
@Table(name = "issue_chat")
public class IssueChat {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_issue")
    private Issue issue;

    @ManyToOne
    @JoinColumn(name = "id_sender")
    private Account sender;

    private String message;
    private Timestamp creation_date;
    private Boolean vued;

    public IssueChat() {
    }

    public IssueChat(Integer id, Issue issue, Account sender, String message, Timestamp creation_date, Boolean vued) {
        this.id = id;
        this.issue = issue;
        this.sender = sender;
        this.message = message;
        this.creation_date = creation_date;
        this.vued = vued;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
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

    public Boolean getVued() {
        return vued;
    }

    public void setVued(Boolean vued) {
        this.vued = vued;
    }

    @Override
    public String toString() {
        return "IssueChat [creation_date=" + creation_date + ", id=" + id + ", issue=" + issue + ", message=" + message
                + ", sender=" + sender + ", vued=" + vued + "]";
    }

    

   
}