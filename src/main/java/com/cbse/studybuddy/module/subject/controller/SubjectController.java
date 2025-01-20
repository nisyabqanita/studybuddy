package com.cbse.studybuddy.module.subject.controller;

import com.cbse.studybuddy.module.subject.model.Subject;
import com.cbse.studybuddy.module.subject.service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {
    private final SubjectService subjectService;

    public SubjectController(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @PostMapping
    public Subject addSubject(@RequestBody Subject subject) {
        return subjectService.addSubject(subject);
    }

    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
    }
}
