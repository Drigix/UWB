package com.uwb.clientserver.controllers.object;

import com.uwb.clientserver.models.request.object.UwbObjectTypeRequest;
import com.uwb.clientserver.models.response.object.UwbObjectTypeResponse;
import com.uwb.clientserver.services.object.UwbObjectTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static com.uwb.clientserver.security.AuthoritiesConstants.ADMIN_PREAUTHORIZE;
import static com.uwb.clientserver.security.AuthoritiesConstants.LOGGED_USER_PREAUTHORIZE;

@RestController
@RequestMapping("/api/uwb-object-type")
@RequiredArgsConstructor
@Slf4j
public class UwbObjectTypeController {
    private final Logger logger = LoggerFactory.getLogger(UwbObjectTypeController.class);
    private final UwbObjectTypeService uwbObjectTypeService;

    /**
     * Endpoint for create uwb-object type.
     *
     * @param request The request body containing uwb-object type data.
     * @return uwb-object type response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public UwbObjectTypeResponse createUwbObjectType(@Valid @RequestBody UwbObjectTypeRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to create new uwb-object type: {}", request);
        return uwbObjectTypeService.create(request);
    }

    /**
     * Endpoint for get all uwb-object types.
     *
     * @return list of uwb-object type response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<UwbObjectTypeResponse> getAllUwbObjectTypes() {
        logger.info("Request to get all uwb-object types.");
        return uwbObjectTypeService.findAll();
    }

    /**
     * Endpoint for get all uwb-object types by user organization unit.
     *
     * @param id The ID of user organization unit.
     * @return list of uwb-object types response.
     * @exception IOException in case of read bytes from file error.
     */
    @GetMapping("/user-organization-unit/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<UwbObjectTypeResponse> getAllUwbObjectTypesByUserOrganizationUnit(@PathVariable Long id) throws IOException {
        logger.info("Request to get all all uwb-object types by user organization unit.");
        return uwbObjectTypeService.findAllByOrganization(id);
    }

    /**
     * Endpoint for update uwb-object type.
     *
     * @param request The request body containing uwb-object type data.
     * @return uwb-object type response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public UwbObjectTypeResponse updateUwbObjectType(@Valid @RequestBody UwbObjectTypeRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to update uwb-object type: {}.", request);
        return uwbObjectTypeService.update(request);
    }

    /**
     * Endpoint for delete uwb-object type.
     *
     * @param id The id of uwb-object type.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteUwbObjectType(@PathVariable Long id) {
        logger.info("Request to delete uwb-object type: {}.", id);
        uwbObjectTypeService.delete(id);
        return ResponseEntity.ok("Uwb-object type has been deleted!");
    }
}
