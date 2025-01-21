package com.cbse.studybuddy.module.resource.repository;

import com.cbse.studybuddy.module.resource.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ResourceRepository extends JpaRepository<Resource, Long> {

    @Query("SELECT r FROM Resource r WHERE LOWER(r.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Resource> findByTitleContainingIgnoreCase(@Param("title") String title);

    @Query("SELECT r FROM Resource r WHERE LOWER(r.type) = LOWER(:type)")
    List<Resource> findByTypeIgnoreCase(@Param("type") String type);
}