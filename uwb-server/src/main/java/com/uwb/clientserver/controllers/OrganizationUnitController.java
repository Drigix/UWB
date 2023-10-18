package com.uwb.clientserver.controllers;

import com.uwb.clientserver.models.OrganizationUnit;
import com.uwb.clientserver.models.request.OrganizationUnitRequest;
import com.uwb.clientserver.models.response.OrganizationUnitResponse;
import com.uwb.clientserver.models.response.OrganizationUnitTreeResponse;
import com.uwb.clientserver.services.OrganizationUnitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import static com.uwb.clientserver.security.AuthoritiesConstants.*;
import java.util.List;

@RestController
@RequestMapping("/api/uwb/organization-unit")
@RequiredArgsConstructor
@Slf4j
public class OrganizationUnitController {
    private final Logger logger = LoggerFactory.getLogger(OrganizationUnitController.class);
    private final OrganizationUnitService organizationUnitService;

    /**
     * Endpoint for create organization unit.
     *
     * @param request The request body containing organization unit data.
     * @return organization unit response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public OrganizationUnitResponse createOrganizationUnit(@Valid @RequestBody OrganizationUnitRequest request) throws MethodArgumentNotValidException  {
        logger.info("Request to create new organization unit: {}", request);
        return organizationUnitService.create(request);
    }

    /**
     * Endpoint for get all organization units.
     *
     * @return list of organization units response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<OrganizationUnitResponse> getAllOrganizationUnits() {
        logger.info("Request to get all organization units.");
        return organizationUnitService.findAll();
    }

    /**
     * Endpoint for get tree organization units.
     *
     * @return tree of organization unit tree response.
     */
    @GetMapping("/tree")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<OrganizationUnitTreeResponse> getTreeOrganizationUnits() {
        logger.info("Request to get tree organization units.");
        return organizationUnitService.findTree();
    }

    /**
     * Endpoint for update organization unit.
     *
     * @param request The request body containing organization unit data.
     * @return organization unit response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public OrganizationUnitResponse updateOrganizationUnit(@Valid @RequestBody OrganizationUnitRequest request) throws MethodArgumentNotValidException  {
        logger.info("Request to update organization unit: {}", request);
        return organizationUnitService.update(request);
    }

    /**
     * Endpoint for delete organization unit and their children.
     *
     * @param id The id of organization unit.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteOrganizationUnit(@PathVariable Long id) {
        logger.info("Request to delete organization unit: {}", id);
        organizationUnitService.delete(id);
        return ResponseEntity.ok("Organization unit has been deleted!");
    }

}
