package com.uwb.clientserver.controllers;

import com.uwb.clientserver.models.request.BackgroundRequest;
import com.uwb.clientserver.models.response.BackgroundResponse;
import com.uwb.clientserver.services.BackgroundService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import static com.uwb.clientserver.security.AuthoritiesConstants.*;

@RestController
@RequestMapping("/api/uwb/background")
@RequiredArgsConstructor
@Slf4j
public class BackgroundController {
    private final Logger logger = LoggerFactory.getLogger(BackgroundController.class);
    private final BackgroundService backgroundService;

    /**
     * Endpoint for create background.
     *
     * @param request The request body containing background data.
     * @return background response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public BackgroundResponse createBackground(@Valid @RequestBody BackgroundRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to create new background: {}", request);
        return backgroundService.create(request);
    }

    /**
     * Endpoint for upload background file.
     *
     * @param file The request body containing background file .
     * @exception URISyntaxException in case of URI errors.
     * @exception IOException in case of File save errors.
     */
    @PostMapping("/upload-file")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> uploadBackground(@RequestBody MultipartFile file) throws URISyntaxException, IOException {
        logger.info("Request to upload background file to server!");
        backgroundService.uploadFile(file);
        return ResponseEntity.created(new URI("/api/background")).body("File has been uploaded!");
    }

    /**
     * Endpoint for get all backgrounds.
     *
     * @return list of background response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<BackgroundResponse> getAllBackgrounds() {
        logger.info("Request to get all backgrounds.");
        return backgroundService.findAll();
    }

    /**
     * Endpoint for get all backgrounds by user organization unit.
     *
     * @param id The ID of user organization unit.
     * @return list of background response.
     */
    @GetMapping("/user-organization-unit/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<BackgroundResponse> getAllBackgroundsByUserOrganizationUnit(@PathVariable Long id) throws IOException {
        logger.info("Request to get all backgrounds by user organization unit.");
        return backgroundService.findAllByOrganization(id);
    }

    /**
     * Endpoint for update background.
     *
     * @param request The request body containing background data.
     * @return background response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public BackgroundResponse updateBackground(@Valid @RequestBody BackgroundRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to update background: {}.", request);
        return backgroundService.update(request);
    }

    /**
     * Endpoint for delete background.
     *
     * @param id The id of background.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteBackground(@PathVariable Long id) {
        logger.info("Request to delete background: {}.", id);
        backgroundService.delete(id);
        return ResponseEntity.ok("Background has been deleted!");
    }
}
