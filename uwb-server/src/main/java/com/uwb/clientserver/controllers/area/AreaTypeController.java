package com.uwb.clientserver.controllers.area;


import com.uwb.clientserver.models.request.area.AreaTypeRequest;
import com.uwb.clientserver.models.response.area.AreaTypeResponse;
import com.uwb.clientserver.services.area.AreaTypeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.uwb.clientserver.security.AuthoritiesConstants.ADMIN_PREAUTHORIZE;
import static com.uwb.clientserver.security.AuthoritiesConstants.LOGGED_USER_PREAUTHORIZE;

@RestController
@RequestMapping("/api/area-type")
@RequiredArgsConstructor
@Slf4j
public class AreaTypeController {
    private final Logger logger = LoggerFactory.getLogger(AreaTypeController.class);
    private final AreaTypeService areaTypeService;

    /**
     * Endpoint for create area type.
     *
     * @param request The request body containing area type data.
     * @return area type response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public AreaTypeResponse createAreaType(@Valid @RequestBody AreaTypeRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to create new area type: {}", request);
        return areaTypeService.create(request);
    }

    /**
     * Endpoint for get all area types.
     *
     * @return list of area type response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AreaTypeResponse> getAllAreaTypes() {
        logger.info("Request to get all area types.");
        return areaTypeService.findAll();
    }

    /**
     * Endpoint for get all area types by user organization unit.
     *
     * @param id The ID of user organization unit.
     * @return list of area types response.
     */
    @GetMapping("/background/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AreaTypeResponse> getAllAreaTypesByUserOrganizationUnit(@PathVariable Long id) {
        logger.info("Request to get all all area types by user organization unit.");
        return areaTypeService.findAllByOrganization(id);
    }

    /**
     * Endpoint for update area type.
     *
     * @param request The request body containing area type data.
     * @return area type response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public AreaTypeResponse updateAreaType(@Valid @RequestBody AreaTypeRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to update area type: {}.", request);
        return areaTypeService.update(request);
    }

    /**
     * Endpoint for delete area type.
     *
     * @param id The id of area type.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteAreaType(@PathVariable Long id) {
        logger.info("Request to delete area type: {}.", id);
        areaTypeService.delete(id);
        return ResponseEntity.ok("Uwb-object type has been deleted!");
    }
}
