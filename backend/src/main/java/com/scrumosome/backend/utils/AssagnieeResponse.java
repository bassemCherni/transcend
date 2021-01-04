package com.scrumosome.backend.utils;

public class AssagnieeResponse {
    Integer id;
    String name;
    String picture;

    public AssagnieeResponse() {
    }

    public AssagnieeResponse(Integer id, String name, String picture) {
        this.id = id;
        this.name = name;
        this.picture = picture;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}