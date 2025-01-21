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
        if (subject.getName() == null || subject.getName().isBlank()) {
            throw new IllegalArgumentException("Subject name is required");
        }
        return subjectService.addSubject(subject);
    }

    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
    }

    /**
     * Search subjects by name (case-insensitive).
     * @param name Partial or full name of the subject to search for.
     * @return List of subjects matching the search criteria.
     */

    @GetMapping("/search")
    public List<Subject> searchSubjects(@RequestParam String name) {
        return subjectService.searchSubjectsByName(name);
    }

    /**
     * Update a subject by ID.
     * @param id ID of the subject to update.
     * @param updatedSubject Subject object containing the updated details.
     * @return The updated Subject object.
     */
    @PutMapping("/{id}")
    public Subject updateSubject(@PathVariable Long id, @RequestBody Subject updatedSubject) {
        if (updatedSubject.getName() == null || updatedSubject.getName().isBlank()) {
            throw new IllegalArgumentException("Subject name is required");
        }
        return subjectService.updateSubject(id, updatedSubject);
    }
}
