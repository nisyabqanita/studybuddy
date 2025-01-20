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
        return subjectRepository.save(subject);
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }
}

