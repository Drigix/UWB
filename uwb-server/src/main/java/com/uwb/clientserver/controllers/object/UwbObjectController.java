package com.uwb.clientserver.controllers.object;

import com.uwb.clientserver.models.request.object.UwbObjectRequest;
import com.uwb.clientserver.models.response.object.UwbObjectResponse;
import com.uwb.clientserver.services.object.UwbObjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.uwb.clientserver.security.AuthoritiesConstants.ADMIN_PREAUTHORIZE;
import static com.uwb.clientserver.security.AuthoritiesConstants.LOGGED_USER_PREAUTHORIZE;

@RestController
@RequestMapping("/api/uwb/uwb-object")
@RequiredArgsConstructor
@Slf4j
public class UwbObjectController {
    private final Logger logger = LoggerFactory.getLogger(UwbObjectController.class);
    private final UwbObjectService uwbObjectService;

    /**
     * Endpoint for create uwb-object.
     *
     * @param request The request body containing uwb-object data.
     * @return uwb-object response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<?> createUwbObject(@Valid @RequestBody UwbObjectRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to create new uwb-object: {}", request);
        if(uwbObjectService.findOneByHexTagId(request.getHexTagId()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("UwbObject with hexTagId: " + request.getHexTagId() + " already exists!");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(uwbObjectService.create(request));
    }

    /**
     * Endpoint for get all uwb-objects.
     *
     * @return list of uwb-object response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<UwbObjectResponse> getAllUwbObjects() {
        logger.info("Request to get all uwb-objects.");
        return uwbObjectService.findAll();
    }

    /**
     * Endpoint for get all uwb-objects by user organization unit.
     *
     * @param id The ID of user organization unit.
     * @return list of uwb-objects response.
     * @exception IOException in case of read bytes from file error.
     */
    @GetMapping("/user-organization-unit/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<UwbObjectResponse> getAllUwbObjectsByUserOrganizationUnit(@PathVariable Long id) throws IOException {
        logger.info("Request to get all all uwb-objects by user organization unit.");
        return uwbObjectService.findAllByOrganization(id);
    }

    /**
     * Endpoint for update uwb-object.
     *
     * @param request The request body containing uwb-object data.
     * @return uwb-object response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public UwbObjectResponse updateUwbObject(@Valid @RequestBody UwbObjectRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to update uwb-object: {}.", request);
        return uwbObjectService.update(request);
    }

    /**
     * Endpoint for delete uwb-object.
     *
     * @param id The id of uwb-object.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteUwbObject(@PathVariable Long id) {
        logger.info("Request to delete uwb-object: {}.", id);
        uwbObjectService.delete(id);
        return ResponseEntity.ok("Uwb-object type has been deleted!");
    }
}
