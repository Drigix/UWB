package com.uwb.clientserver.controllers.area;

import com.uwb.clientserver.models.request.area.AreaRequest;
import com.uwb.clientserver.models.response.area.AreaResponse;
import com.uwb.clientserver.services.area.AreaService;
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
@RequestMapping("/api/area")
@RequiredArgsConstructor
@Slf4j
public class AreaController {
    private final Logger logger = LoggerFactory.getLogger(AreaController.class);
    private final AreaService areaService;

    /**
     * Endpoint for create area.
     *
     * @param request The request body containing area data.
     * @return area response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public AreaResponse createArea(@Valid @RequestBody AreaRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to create new area: {}", request);
        return areaService.create(request);
    }

    /**
     * Endpoint for get all areas.
     *
     * @return list of area response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AreaResponse> getAllAreas() {
        logger.info("Request to get all areas.");
        return areaService.findAll();
    }

    /**
     * Endpoint for get all areas by background.
     *
     * @param id The ID of background.
     * @return list of areas response.
     */
    @GetMapping("/background/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AreaResponse> getAllAreasByBackground(@PathVariable Long id)  {
        logger.info("Request to get all areas by background.");
        return areaService.findAllByBackground(id);
    }

    /**
     * Endpoint for update area.
     *
     * @param request The request body containing area data.
     * @return area response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public AreaResponse updateArea(@Valid @RequestBody AreaRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to update area: {}.", request);
        return areaService.update(request);
    }

    /**
     * Endpoint for delete area.
     *
     * @param id The id of area.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteArea(@PathVariable Long id) {
        logger.info("Request to delete area: {}.", id);
        areaService.delete(id);
        return ResponseEntity.ok("Area has been deleted!");
    }
}