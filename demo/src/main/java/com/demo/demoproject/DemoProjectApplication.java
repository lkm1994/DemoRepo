package com.demo.demoproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoProjectApplication {

	public static void main(String[] args) {
		System.out.print("HI");
		SpringApplication.run(DemoProjectApplication.class, args);
		System.out.print("HI");
	}

}
