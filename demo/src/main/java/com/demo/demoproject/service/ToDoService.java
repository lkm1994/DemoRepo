package com.demo.demoproject.service;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.demoproject.model.todolist;
import com.demo.demoproject.repository.TodoRepository;

@Service
public class ToDoService {
	@Autowired
	private TodoRepository todoRepository;
	
	//create
	public todolist create(Date createdOn, String name) {
		return todoRepository.save(new todolist(name, createdOn));
	}
	
	//fetch
	public List<todolist> getAll() {
		return todoRepository.findAll();
	}
	
	//update
	public todolist update(String id, Date createdOn, String name) {
		todolist p = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id " + id));
		p.setCreatedOn(createdOn);
		p.setName(name);
		return todoRepository.save(p);
	}
	
	//delete
	public void delete(String id) {
		todolist p = todoRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id " + id));
		todoRepository.delete(p);
	}
}
