package com.demo.demoproject.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class todolist {
	@Id
	long id;
	String name;
	Date createdOn;

public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Date createdOn) {
		this.createdOn = createdOn;
	}

public todolist(String name, Date createdOn) {
		this.name = name;
		this.createdOn = createdOn;
	}
}
