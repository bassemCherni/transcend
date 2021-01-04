package com.scrumosome.backend.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Users {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id_user;
    private String user_name;
    private String last_name;
    private String tel_num;
    private String profile_pic;
    private String pic_extension;
    private String occupation;
    private String organization;

    public Users() {
    }

    public Users(Integer id_user, String user_name, String last_name, String tel_num, String profile_pic,
            String pic_extension, String occupation, String organization) {
        this.id_user = id_user;
        this.user_name = user_name;
        this.last_name = last_name;
        this.tel_num = tel_num;
        this.profile_pic = profile_pic;
        this.pic_extension = pic_extension;
        this.occupation = occupation;
        this.organization = organization;
    }

    public Integer getId_user() {
        return id_user;
    }

    public void setId_user(Integer id_user) {
        this.id_user = id_user;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getTel_num() {
        return tel_num;
    }

    public void setTel_num(String tel_num) {
        this.tel_num = tel_num;
    }

    public String getProfile_pic() {
        return profile_pic;
    }

    public void setProfile_pic(String profile_pic) {
        this.profile_pic = profile_pic;
    }

    public String getPic_extension() {
        return pic_extension;
    }

    public void setPic_extension(String pic_extension) {
        this.pic_extension = pic_extension;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    @Override
    public String toString() {
        return "Users [id_user=" + id_user + ", last_name=" + last_name + ", occupation=" + occupation
                + ", organization=" + organization + ", pic_extension=" + pic_extension + ", profile_pic=" + profile_pic
                + ", tel_num=" + tel_num + ", user_name=" + user_name + "]";
    }

    
}