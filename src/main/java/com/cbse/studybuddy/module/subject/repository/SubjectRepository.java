package com.cbse.studybuddy.module.subject.repository;

import com.cbse.studybuddy.module.subject.model.Subject;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    @Query("SELECT s FROM Subject s WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Subject> findByNameContainingIgnoreCase(@Param("name") String name);
}

