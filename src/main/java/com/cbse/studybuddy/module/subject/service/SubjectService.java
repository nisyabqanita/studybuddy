package com.cbse.studybuddy.module.subject.service;

import com.cbse.studybuddy.module.subject.model.Subject;
import com.cbse.studybuddy.module.subject.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    private final SubjectRepository subjectRepository;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject addSubject(Subject subject) {
        System.out.println("Saving subject: " + subject);
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }

    public List<Subject> searchSubjectsByName(String name) {
        return subjectRepository.findByNameContainingIgnoreCase(name);
    }

    /**
     * Update an existing subject by ID.
     * @param id ID of the subject to update.
     * @param updatedSubject The updated subject details.
     * @return The updated Subject object.
     */
    public Subject updateSubject(Long id, Subject updatedSubject) {
        // Find the subject to update
        Subject existingSubject = subjectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Subject not found with ID: " + id));

        // Update fields
        existingSubject.setName(updatedSubject.getName());
        existingSubject.setDescription(updatedSubject.getDescription());
        existingSubject.setDifficulty(updatedSubject.getDifficulty());

        // Save and return updated subject
        return subjectRepository.save(existingSubject);
    }
}

