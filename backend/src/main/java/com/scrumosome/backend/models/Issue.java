package com.scrumosome.backend.models;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "issue")
public class Issue {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id_issue;
    private String title;
    private String description;
    private String type;

    @ManyToOne
    @JoinColumn(name = "id_project")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "id_epic")
    private Epic epic;

    @ManyToOne
    @JoinColumn(name = "id_sprint")
    private Sprint sprint;
    private Integer story_point;
    private Timestamp creation_date;

    @OneToOne
    @JoinColumn(name = "id_assignee")
    private Account assignee;
    private String status;
    private Boolean vued;
    private Integer indexer;
    @Column(name="last_modified")
    private Timestamp last_modified;

    public Issue() {
    }

    public Issue(Integer id_issue, String title, String description, String type, Project project, Epic epic,
            Sprint sprint, Integer story_point, Timestamp creation_date, Account assignee, String status, Boolean vued,
            Integer indexer, Timestamp last_modified) {
        this.id_issue = id_issue;
        this.title = title;
        this.description = description;
        this.type = type;
        this.project = project;
        this.epic = epic;
        this.sprint = sprint;
        this.story_point = story_point;
        this.creation_date = creation_date;
        this.assignee = assignee;
        this.status = status;
        this.vued = vued;
        this.indexer = indexer;
        this.last_modified = last_modified;
    }

    public Integer getId_issue() {
        return id_issue;
    }

    public void setId_issue(Integer id_issue) {
        this.id_issue = id_issue;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Epic getEpic() {
        return epic;
    }

    public void setEpic(Epic epic) {
        this.epic = epic;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }

    public Integer getStory_point() {
        return story_point;
    }

    public void setStory_point(Integer story_point) {
        this.story_point = story_point;
    }

    public Timestamp getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Timestamp creation_date) {
        this.creation_date = creation_date;
    }

    public Account getAssignee() {
        return assignee;
    }

    public void setAssignee(Account assignee) {
        this.assignee = assignee;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Boolean getVued() {
        return vued;
    }

    public void setVued(Boolean vued) {
        this.vued = vued;
    }

    public Integer getIndexer() {
        return indexer;
    }

    public void setIndexer(Integer indexer) {
        this.indexer = indexer;
    }

    public Timestamp getLast_modified() {
        return last_modified;
    }

    public void setLast_modified(Timestamp last_modified) {
        this.last_modified = last_modified;
    }

    @Override
    public String toString() {
        return "Issue [assignee=" + assignee + ", creation_date=" + creation_date + ", description=" + description
                + ", epic=" + epic + ", id_issue=" + id_issue + ", indexer=" + indexer + ", last_modified="
                + last_modified + ", project=" + project + ", sprint=" + sprint + ", status=" + status
                + ", story_point=" + story_point + ", title=" + title + ", type=" + type + ", vued=" + vued + "]";
    }

    
    
}