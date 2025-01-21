package com.cbse.studybuddy;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudybuddyApplication implements CommandLineRunner {
	@Value("${upload.directory}")
    private String uploadDirectory;

	public static void main(String[] args) {
		SpringApplication.run(StudybuddyApplication.class, args);
	}

	@Override
    public void run(String... args) {
        // Create the uploads directory under static if it doesn't exist
        File uploadDir = new File(uploadDirectory);
        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            if (created) {
                System.out.println("Uploads directory created: " + uploadDirectory);
            } else {
                System.err.println("Failed to create uploads directory.");
            }
        }
    }

}