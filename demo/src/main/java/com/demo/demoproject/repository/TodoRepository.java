package com.demo.demoproject.repository;
//import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.demo.demoproject.model.todolist;

@Repository
public interface TodoRepository extends MongoRepository<todolist, String> {

}
