package com.cbse.studybuddy.module.subject.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Subject name is required")
    private String name;

    private String description;
    private String difficulty;

    // Getters and Setters
}