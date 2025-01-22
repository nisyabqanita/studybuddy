package com.cbse.studybuddy.module.progress.controller;

import com.cbse.studybuddy.module.progress.model.Progress;
import com.cbse.studybuddy.module.progress.service.ProgressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping
    public List<Progress> getAllProgress() {
        return progressService.getAllProgress();
    }

    @GetMapping("/subject/{subjectId}")
    public List<Progress> getProgressBySubject(@PathVariable Long subjectId) {
        return progressService.getProgressBySubject(subjectId);
    }

    @PostMapping("/{subjectId}")
    public Progress addProgress(@PathVariable Long subjectId, @RequestBody Progress progress) {
        return progressService.addProgress(subjectId, progress);
    }

    @PutMapping("/{id}")
    public Progress updateProgress(@PathVariable Long id, @RequestBody Progress updatedProgress) {
        return progressService.updateProgress(id, updatedProgress);
    }

    @DeleteMapping("/{id}")
    public void deleteProgress(@PathVariable Long id) {
        progressService.deleteProgress(id);
    }

    // @GetMapping("/subject/{subjectId}")
    // public List<Progress> getProgressBySubject(@PathVariable Long subjectId) {
    //     return progressService.getProgressBySubject(subjectId);
    // }
}