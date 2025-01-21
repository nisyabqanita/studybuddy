package com.cbse.studybuddy.module.resource.controller;

import com.cbse.studybuddy.module.resource.model.Resource;
import com.cbse.studybuddy.module.resource.service.ResourceService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    @Value("${upload.directory}")
    private String uploadDirectory;

    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    public List<Resource> getAllResources() {
        return resourceService.getAllResources();
    }

    @PostMapping
    public ResponseEntity<?> addResource(
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "link", required = false) String link,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Resource resource = new Resource();
            resource.setTitle(title);
            resource.setDescription(description);

            // Handle file upload or link
            if (file != null && !file.isEmpty()) {
                // Sanitize the filename
                String originalFileName = file.getOriginalFilename();
                String sanitizedFileName = originalFileName != null
                        ? originalFileName.replaceAll(" ", "_") // Replace spaces with underscores
                                         .replaceAll("[^a-zA-Z0-9._-]", "") // Remove invalid characters
                        : "uploaded_file";
            
                // Define the target path
                Path filePath = Paths.get(uploadDirectory, sanitizedFileName);
            
                // Save the sanitized file
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
                // Set resource properties
                resource.setType("Document");
                resource.setFilePath("/uploads/" + sanitizedFileName); // Save the sanitized filename for serving
            } else if (link != null && !link.isEmpty()) {
                resource.setType("Link");
                resource.setLink(link);
            } else {
                resource.setType("Other");
            }

            // Save the resource
            Resource savedResource = resourceService.addResource(resource);
            return new ResponseEntity<>(savedResource, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResource(@PathVariable Long id) {
        try {
            Resource resource = resourceService.getResourceById(id); // Fetch the resource from the database

            if (resource != null && resource.getFilePath() != null) {
                Path filePath = Paths.get(resource.getFilePath());
                Files.deleteIfExists(filePath); // Delete the file from the filesystem
            }

            resourceService.deleteResource(id); // Remove the resource from the database
            return ResponseEntity.ok("Resource and associated file deleted successfully.");
        } catch (IOException e) {
            e.printStackTrace(); // Log the error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Log other errors
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting resource: " + e.getMessage());
        }
    }


    @GetMapping("/search/title")
    public List<Resource> searchResourcesByTitle(@RequestParam String title) {
        return resourceService.searchResourcesByTitle(title);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateResource(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "link", required = false) String link,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Resource resource = resourceService.getResourceById(id);

            if (resource == null) {
                return ResponseEntity.notFound().build();
            }

            // Update title and description
            resource.setTitle(title);
            resource.setDescription(description);

            // Handle link: Set to null if empty
            if (link == null || link.isBlank()) {
                resource.setLink(null);
            } else {
                resource.setLink(link);
            }

            // Handle file upload
            if (file != null && !file.isEmpty()) {
                // Delete the old file if it exists
                if (resource.getFilePath() != null && !resource.getFilePath().isBlank()) {
                    Path oldFilePath = Paths.get(uploadDirectory, resource.getFilePath().replace("/uploads/", ""));
                    Files.deleteIfExists(oldFilePath); // Deletes the existing file
                }

                // Sanitize the filename
                String sanitizedFileName = StringUtils.cleanPath(file.getOriginalFilename());
                Path filePath = Paths.get(uploadDirectory, sanitizedFileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                resource.setFilePath("/uploads/" + sanitizedFileName);
                resource.setType("Document");
            }

            // Update the resource in the database
            resourceService.updateResource(id, resource);

            return ResponseEntity.ok(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating resource.");
        }
    }


}
