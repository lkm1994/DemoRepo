package com.demo.demoproject.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.demoproject.model.todolist;
import com.demo.demoproject.service.ToDoService;

@RestController
@RequestMapping(path = "/demo/app")
public class HomeController {
	
	@Autowired
	private ToDoService todoService;
	
	@RequestMapping(
			path="/list",
			method=RequestMethod.GET) 
		public List<todolist> getAll(){
			System.out.print("Hi in contoller");
			return todoService.getAll();
		}
	@RequestMapping(path="/add", method=RequestMethod.POST)
	public String create(@RequestParam String name, @RequestParam Date createdOn) {
		System.out.print("Name"+ name + "Created On" + createdOn);
		todolist p = todoService.create(createdOn, name);
		return p.toString();
	}
	
	@RequestMapping(value="/edit", method = RequestMethod.PUT)
	public String update(@RequestParam String id ,@RequestParam String name, @RequestParam Date createdOn) {
		todolist p = todoService.update(id, createdOn, name);
		return p.toString();
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.DELETE)
	public String delete(@RequestParam String id) {
		todoService.delete(id);
		return "Deleted Successfully";
	}
//	public list<Todo> list() {
//		
//	}
}
