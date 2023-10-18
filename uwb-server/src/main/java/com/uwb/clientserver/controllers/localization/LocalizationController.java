package com.uwb.clientserver.controllers.localization;

import com.uwb.clientserver.dao.localization.LocalizationDao;
import com.uwb.clientserver.models.localization.LocalizationRequest;
import com.uwb.clientserver.services.object.UwbObjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.uwb.clientserver.security.AuthoritiesConstants.ADMIN_PREAUTHORIZE;

@RestController
@RequestMapping("/api/uwb/localization")
@RequiredArgsConstructor
@Slf4j
public class LocalizationController {

    private final LocalizationDao localizationDao;
    private final UwbObjectService uwbObjectService;

    /**
     * Endpoint for create localization.
     *
     * @param request The request body containing localization data.
     * @return string response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<?> createAnchor(@Valid @RequestBody LocalizationRequest request) throws MethodArgumentNotValidException {
        log.info("Request to create new localization: {}", request);
        if(uwbObjectService.findOneByHexTagId(request.getTagId()) == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Tag with hexID: " + request.getTagId() + " not exist!");
        }
        localizationDao.createLocalization(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("New localization created!");
    }
}
