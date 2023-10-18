package com.uwb.clientserver.controllers.notification;

import com.uwb.clientserver.models.request.notification.NotificationConfigRequest;
import com.uwb.clientserver.models.response.notification.NotificationConfigResponse;
import com.uwb.clientserver.models.response.object.UwbObjectResponse;
import com.uwb.clientserver.services.notification.NotificationConfigService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequestMapping("/api/uwb/notification-config")
@RequiredArgsConstructor
@Slf4j
public class NotificationConfigController {

    private final NotificationConfigService notificationConfigService;

    /**
     * Endpoint for create notification config.
     *
     * @param request The request body containing notificationConfig data.
     * @return notificationConfig response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PostMapping()
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<?> createNotificationConfig(@Valid @RequestBody NotificationConfigRequest request) throws MethodArgumentNotValidException {
        log.info("Request to create new notificationConfig: {}", request);
        return ResponseEntity.status(HttpStatus.CREATED).body(notificationConfigService.create(request));
    }

    /**
     * Endpoint for get all notification configs.
     *
     * @return list of notificationConfig response.
     */
    @GetMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<NotificationConfigResponse> getAllNotificationConfigs() {
        log.info("Request to get all notificationConfigs.");
        return notificationConfigService.findAll();
    }

    /**
     * Endpoint for get all notification configs by user organization unit.
     *
     * @param id The ID of user organization unit.
     * @return list of notification configs response.
     */
    @GetMapping("/user-organization-unit/{id}")
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public List<NotificationConfigResponse> getAllNotificationConfigsByUserOrganizationUnit(@PathVariable Long id) {
        log.info("Request to get all all uwb-objects by user organization unit.");
        return notificationConfigService.findAllByOrganization(id);
    }

    /**
     * Endpoint for update notificationConfig.
     *
     * @param request The request body containing notificationConfig data.
     * @return notificationConfig response body.
     * @exception MethodArgumentNotValidException in case of validation errors.
     */
    @PutMapping()
    @PreAuthorize(LOGGED_USER_PREAUTHORIZE)
    public NotificationConfigResponse updateNotificationConfig(@Valid @RequestBody NotificationConfigRequest request) throws MethodArgumentNotValidException {
        log.info("Request to update notificationConfig: {}.", request);
        return notificationConfigService.update(request);
    }

    /**
     * Endpoint for delete notificationConfig.
     *
     * @param id The id of notificationConfig.
     * @return HttpStatus.OK .
     */
    @DeleteMapping("/{id}")
    @PreAuthorize(ADMIN_PREAUTHORIZE)
    public ResponseEntity<String> deleteNotificationConfig(@PathVariable Long id) {
        log.info("Request to delete notificationConfig: {}.", id);
        notificationConfigService.delete(id);
        return ResponseEntity.ok("NotificationConfig has been deleted!");
    }
}
