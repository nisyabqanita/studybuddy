package com.cbse.studybuddy.module.progress.service;

import com.cbse.studybuddy.module.progress.model.Progress;
import com.cbse.studybuddy.module.progress.repository.ProgressRepository;
import com.cbse.studybuddy.module.subject.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {
    private final ProgressRepository progressRepository;
    private final SubjectRepository subjectRepository;

    public ProgressService(ProgressRepository progressRepository, SubjectRepository subjectRepository) {
        this.progressRepository = progressRepository;
        this.subjectRepository = subjectRepository;
    }

    public List<Progress> getAllProgress() {
        return progressRepository.findAll();
    }

    public List<Progress> getProgressBySubject(Long subjectId) {
        return progressRepository.findBySubjectId(subjectId);
    }

    public Progress addProgress(Long subjectId, Progress progress) {
        var subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new IllegalArgumentException("Subject not found with ID: " + subjectId));
        progress.setSubject(subject);
        return progressRepository.save(progress);
    }

    public Progress updateProgress(Long id, Progress updatedProgress) {
        Progress existingProgress = progressRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Progress not found with ID: " + id));

        existingProgress.setDescription(updatedProgress.getDescription());
        existingProgress.setDate(updatedProgress.getDate());
        return progressRepository.save(existingProgress);
    }

    public void deleteProgress(Long id) {
        progressRepository.deleteById(id);
    }
}