package com.cbse.studybuddy.module.resource.service;

import com.cbse.studybuddy.module.resource.model.Resource;
import com.cbse.studybuddy.module.resource.repository.ResourceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public Resource addResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }

    public List<Resource> searchResourcesByTitle(String title) {
        return resourceRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<Resource> searchResourcesByType(String type) {
        return resourceRepository.findByTypeIgnoreCase(type);
    }

    public Resource updateResource(Long id, Resource updatedResource) {
        Resource existingResource = resourceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Resource not found with ID: " + id));

        existingResource.setTitle(updatedResource.getTitle());
        existingResource.setType(updatedResource.getType());
        existingResource.setDescription(updatedResource.getDescription());

        return resourceRepository.save(existingResource);
    }
}
