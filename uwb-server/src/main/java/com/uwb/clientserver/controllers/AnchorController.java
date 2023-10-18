package com.uwb.clientserver.controllers;

import com.uwb.clientserver.models.request.AnchorRequest;
import com.uwb.clientserver.models.response.AnchorResponse;
import com.uwb.clientserver.services.AnchorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.uwb.clientserver.security.AuthoritiesConstants.ADMIN_PREAUTHORIZE;
import static com.uwb.clientserver.security.AuthoritiesConstants.LOGGED_USER_PREAUTHORIZE;
@RestController
@RequestMapping("/api/uwb/anchor")
@RequiredArgsConstructor
@Slf4j
public class AnchorController {
    
    private final AnchorService anchorService;

    /**
     * Endpoint for create anchor.
     *
     * @param request The request body containing anchor data.
     * @return anchor response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<?> createAnchor(@Valid @RequestBody AnchorRequest request) throws MethodArgumentNotValidException {
        log.info("Request to create new anchor: {}", request);
        if(anchorService.findOneByName(request.getName()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Anchor with ID: " + request.getName() + " already exists!");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(anchorService.create(request));
    }

    /**
     * Endpoint for get all anchors.
     *
     * @return list of anchor response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AnchorResponse> getAllAnchors() {
        log.info("Request to get all anchors.");
        return anchorService.findAll();
    }

    /**
     * Endpoint for get all anchors by background.
     *
     * @param id The ID of background.
     * @return list of anchors response.
     */
    @GetMapping("/background/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<AnchorResponse> getAllAnchorsByBackground(@PathVariable Long id)  {
        log.info("Request to get all anchors by background: {}.", id);
        return anchorService.findAllByBackground(id);
    }

    /**
     * Endpoint for update anchor.
     *
     * @param request The request body containing anchor data.
     * @return anchor response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public AnchorResponse updateAnchor(@Valid @RequestBody AnchorRequest request) throws MethodArgumentNotValidException {
        log.info("Request to update anchor: {}.", request);
        return anchorService.update(request);
    }

    /**
     * Endpoint for delete anchor.
     *
     * @param id The id of anchor.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteAnchor(@PathVariable Long id) {
        log.info("Request to delete anchor: {}.", id);
        anchorService.delete(id);
        return ResponseEntity.ok("Anchor has been deleted!");
    }
}
