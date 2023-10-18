package com.uwb.clientserver.controllers.object;

import com.uwb.clientserver.models.request.object.UwbObjectIconRequest;
import com.uwb.clientserver.models.response.object.UwbObjectIconResponse;
import com.uwb.clientserver.services.object.UwbObjectIconService;
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

import static com.uwb.clientserver.security.AuthoritiesConstants.ADMIN_PREAUTHORIZE;
import static com.uwb.clientserver.security.AuthoritiesConstants.LOGGED_USER_PREAUTHORIZE;

@RestController
@RequestMapping("/api/uwb/uwb-object-icon")
@RequiredArgsConstructor
@Slf4j
public class UwbObjectIconController {
    private final Logger logger = LoggerFactory.getLogger(UwbObjectIconController.class);
    private final UwbObjectIconService uwbObjectIconService;

    /**
     * Endpoint for create uwb-object icon.
     *
     * @param request The request body containing uwb-object icon data.
     * @return  wb-object icon response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public UwbObjectIconResponse createUwbObjectIcon(@Valid @RequestBody UwbObjectIconRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to create new uwb-object icon: {}", request);
        return uwbObjectIconService.create(request);
    }

    /**
     * Endpoint for upload uwb-object icon file.
     *
     * @param file The request body containing uwb-object icon file .
     * @exception URISyntaxException in case of URI errors.
     * @exception IOException in case of File save errors.
     */
    @PostMapping("/upload-file")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> uploadUwbObjectIcon(@RequestBody MultipartFile file) throws URISyntaxException, IOException {
        logger.info("Request to upload uwb-object icon file to server!");
        uwbObjectIconService.uploadFile(file);
        return ResponseEntity.created(new URI("/api/uwb-object-icon")).body("File has been uploaded!");
    }

    /**
     * Endpoint for get all uwb-object icons.
     *
     * @return list of uwb-object icon response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<UwbObjectIconResponse> getAllUwbObjectIcons() {
        logger.info("Request to get all uwb-object icons.");
        return uwbObjectIconService.findAll();
    }

    /**
     * Endpoint for get all uwb-object icons by user organization unit.
     *
     * @param id The ID of user organization unit.
     * @return list of uwb-object icons response.
     * @exception IOException in case of read bytes from file error.
     */
    @GetMapping("/user-organization-unit/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<UwbObjectIconResponse> getAllUwbObjectIconsByUserOrganizationUnit(@PathVariable Long id) throws IOException {
        logger.info("Request to get all uwb-object icons by user organization unit.");
        return uwbObjectIconService.findAllByOrganization(id);
    }

    /**
     * Endpoint for update uwb-object icon.
     *
     * @param request The request body containing uwb-object icon data.
     * @return uwb-object icon response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public UwbObjectIconResponse updateUwbObjectIcon(@Valid @RequestBody UwbObjectIconRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to update uwb-object icon: {}.", request);
        return uwbObjectIconService.update(request);
    }

    /**
     * Endpoint for delete uwb-object icon.
     *
     * @param id The id of uwb-object icon.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteUwbObjectIcon(@PathVariable Long id) {
        logger.info("Request to delete uwb-object icons: {}.", id);
        uwbObjectIconService.delete(id);
        return ResponseEntity.ok("Uwb-object icon has been deleted!");
    }
}
