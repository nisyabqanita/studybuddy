package com.cbse.studybuddy.module.resource.controller;

import com.cbse.studybuddy.module.resource.model.Resource;
import com.cbse.studybuddy.module.resource.service.ResourceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    public List<Resource> getAllResources() {
        return resourceService.getAllResources();
    }

    @PostMapping
    public Resource addResource(@RequestBody Resource resource) {
        return resourceService.addResource(resource);
    }

    @DeleteMapping("/{id}")
    public void deleteResource(@PathVariable Long id) {
        resourceService.deleteResource(id);
    }

    @GetMapping("/search/title")
    public List<Resource> searchResourcesByTitle(@RequestParam String title) {
        return resourceService.searchResourcesByTitle(title);
    }

    @GetMapping("/search/type")
    public List<Resource> searchResourcesByType(@RequestParam String type) {
        return resourceService.searchResourcesByType(type);
    }

    @PutMapping("/{id}")
    public Resource updateResource(@PathVariable Long id, @RequestBody Resource updatedResource) {
        return resourceService.updateResource(id, updatedResource);
    }
}