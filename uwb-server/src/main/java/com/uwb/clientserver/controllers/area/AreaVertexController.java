package com.uwb.clientserver.controllers.area;

import com.uwb.clientserver.models.request.area.AreaVertexRequest;
import com.uwb.clientserver.models.response.area.AreaVertexResponse;
import com.uwb.clientserver.services.area.AreaVertexService;
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
@RequestMapping("/api/area-vertex")
@RequiredArgsConstructor
@Slf4j
public class AreaVertexController {
    private final Logger logger = LoggerFactory.getLogger(AreaVertexController.class);
    private final AreaVertexService areaVertexService;

    /**
     * Endpoint for create area vertex.
     *
     * @param request The request body containing area vertex data.
     * @return area vertex response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public AreaVertexResponse createAreaVertex(@Valid @RequestBody AreaVertexRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to create new area vertex: {}", request);
        return areaVertexService.create(request);
    }

    /**
     * Endpoint for create area vertex list.
     *
     * @param request The request body containing area vertex list data.
     * @return area vertex list response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping("/vertex-list")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public List<AreaVertexResponse> createAreaVertexList(@Valid @RequestBody List<AreaVertexRequest> request) throws MethodArgumentNotValidException {
        logger.info("Request to create new area vertex list: {}", request);
        return areaVertexService.createList(request);
    }

    /**
     * Endpoint for get all area vertexes.
     *
     * @return list of area vertex response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AreaVertexResponse> getAllAreaVertexs() {
        logger.info("Request to get all area vertexs.");
        return areaVertexService.findAll();
    }

    /**
     * Endpoint for get all area vertexes by background.
     *
     * @param id The ID of background.
     * @return list of area vertexes response.
     */
    @GetMapping("/background/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AreaVertexResponse> getAllAreaVertexsByBackground(@PathVariable Long id) {
        logger.info("Request to get all area vertexes by background: {}.", id);
        return areaVertexService.findAllByBackground(id);
    }

    /**
     * Endpoint for get all area vertexes by area.
     *
     * @param id The ID of area.
     * @return list of area vertexes response.
     */
    @GetMapping("/area/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AreaVertexResponse> getAllAreaVertexsByArea(@PathVariable Long id) {
        logger.info("Request to get all area vertexes by area: {}.", id);
        return areaVertexService.findAllByArea(id);
    }

    /**
     * Endpoint for update area vertex.
     *
     * @param request The request body containing area vertex data.
     * @return area vertex response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public AreaVertexResponse updateAreaVertex(@Valid @RequestBody AreaVertexRequest request) throws MethodArgumentNotValidException {
        logger.info("Request to update area vertex: {}.", request);
        return areaVertexService.update(request);
    }

    /**
     * Endpoint for update area vertex list.
     *
     * @param request The request body containing area vertex list data.
     * @return area vertex list response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping("/vertex-list")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AreaVertexResponse> updateAreaVertexList(@Valid @RequestBody List<AreaVertexRequest> request) throws MethodArgumentNotValidException {
        logger.info("Request to update area vertex list: {}.", request);
        return areaVertexService.updateList(request);
    }

    /**
     * Endpoint for delete area vertex.
     *
     * @param id The id of area vertex.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteAreaVertex(@PathVariable Long id) {
        logger.info("Request to delete area vertex: {}.", id);
        areaVertexService.delete(id);
        return ResponseEntity.ok("Area vertex has been deleted!");
    }

    /**
     * Endpoint for delete area vertex.
     *
     * @param ids The id list of area vertexes.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/vertex-list")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteAreaVertexList(@RequestParam List<Long> ids) {
        logger.info("Request to delete area vertex: {}.", ids);
        areaVertexService.deleteList(ids);
        return ResponseEntity.ok("Area vertex list has been deleted!");
    }
}
