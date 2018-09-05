package com.jdrx.eams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.jdrx")
public class ApplicationStart {
    public static void main(String[] args) {
        ApplicationContext applicationContext = SpringApplication.run(ApplicationStart.class);
    }

}
