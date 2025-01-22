package com.cbse.studybuddy.module.progress.repository;

import com.cbse.studybuddy.module.progress.model.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgressRepository extends JpaRepository<Progress, Long> {
    List<Progress> findBySubjectId(Long subjectId);
}
