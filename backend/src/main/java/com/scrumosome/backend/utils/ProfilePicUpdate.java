package com.scrumosome.backend.utils;

public class ProfilePicUpdate {
    
    private Integer id;
    private String picLink;
    private String extension;
    
	public ProfilePicUpdate() {
	}

    public ProfilePicUpdate(Integer id, String picLink, String extension) {
        this.id = id;
        this.picLink = picLink;
        this.extension = extension;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPicLink() {
        return picLink;
    }

    public void setPicLink(String picLink) {
        this.picLink = picLink;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}