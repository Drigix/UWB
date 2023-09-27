package com.uwb.clientserver.services.impl;

import com.uwb.clientserver.exceptions.ItemNotExistException;
import com.uwb.clientserver.mappers.OrganizationUnitMapper;
import com.uwb.clientserver.models.Background;
import com.uwb.clientserver.models.OrganizationUnit;
import com.uwb.clientserver.models.User;
import com.uwb.clientserver.models.area.AreaType;
import com.uwb.clientserver.models.object.UwbObjectType;
import com.uwb.clientserver.models.request.OrganizationUnitRequest;
import com.uwb.clientserver.models.response.OrganizationUnitResponse;
import com.uwb.clientserver.models.response.OrganizationUnitTreeResponse;
import com.uwb.clientserver.repositories.OrganizationUnitRepository;
import com.uwb.clientserver.repositories.UserRepository;
import com.uwb.clientserver.services.BackgroundService;
import com.uwb.clientserver.services.OrganizationUnitService;
import com.uwb.clientserver.services.area.AreaTypeService;
import com.uwb.clientserver.services.object.UwbObjectTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
public class OrganizationUnitServiceImpl implements OrganizationUnitService {

    private final OrganizationUnitMapper organizationUnitMapper;
    private final OrganizationUnitRepository organizationUnitRepository;
    private final UserRepository userRepository;
    private final BackgroundService backgroundService;
    private final AreaTypeService areaTypeService;
    private final UwbObjectTypeService uwbObjectTypeService;

    @Override
    public OrganizationUnitResponse create(OrganizationUnitRequest request) {
        OrganizationUnit organizationUnit = organizationUnitMapper.toEntity(request);
        return organizationUnitMapper.toResponse(organizationUnitRepository.save(organizationUnit));
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrganizationUnitResponse> findAll() {
        return organizationUnitMapper.toResponseList(organizationUnitRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrganizationUnitTreeResponse> findTree() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String formattedStringId = ";" + user.getOrganizationUnit().getId().toString() + ";";
        List<OrganizationUnit> organizationUnits = organizationUnitRepository.findAllForUser(formattedStringId, user.getOrganizationUnit().getId());
        Map<Long, OrganizationUnitTreeResponse> treeNodesMap = new HashMap<>();
        for(OrganizationUnit organizationUnit: organizationUnits) {
            OrganizationUnitTreeResponse treeNode = OrganizationUnitTreeResponse.builder()
                    .data(organizationUnitMapper.toResponse(organizationUnit))
                    .children(new ArrayList<>())
                    .build();
            treeNodesMap.put(organizationUnit.getId(), treeNode);
        }
        List <OrganizationUnitTreeResponse> treeNodes = new ArrayList<>();
        for(OrganizationUnit organizationUnit: organizationUnits) {
            OrganizationUnitTreeResponse treeNode = treeNodesMap.get(organizationUnit.getId());
            if(treeNode.getData().getParentOrganizationUnitId() != null) {
                OrganizationUnitTreeResponse parentTreeNode = treeNodesMap.get(organizationUnit.getParentOrganizationUnitId());
                if(parentTreeNode != null) {
                    parentTreeNode.getChildren().add(treeNode);
                } else {
                    treeNodes.add(treeNode);
                }
            } else {
                treeNodes.add(treeNode);
            }
        }
        return treeNodes;
    }

    @Override
    public OrganizationUnitResponse update(OrganizationUnitRequest request) {
        OrganizationUnit organizationUnit = organizationUnitMapper.toEntity(request);
        return organizationUnitMapper.toResponse(organizationUnitRepository.save(organizationUnit));
    }

    @Override
    public void delete(Long id) {
        String formattedStringId = ";" + id.toString() + ";";
        List<OrganizationUnit> organizationUnits = organizationUnitRepository.findAllForUser(formattedStringId, id);
        for(OrganizationUnit organizationUnit: organizationUnits) {
            List<Long> backgroundIds = organizationUnit.getBackgrounds()
                    .stream()
                    .mapToLong(Background::getId)
                    .boxed()
                    .toList();
            List<Long> areaTypeIds = organizationUnit.getAreaTypes()
                    .stream()
                    .mapToLong(AreaType::getId)
                    .boxed()
                    .toList();
            List<Long> uwbObjectTypeIds = organizationUnit.getUwbObjectTypes()
                    .stream()
                    .mapToLong(UwbObjectType::getId)
                    .boxed()
                    .toList();
            backgroundService.deleteList(backgroundIds);
            areaTypeService.deleteList(areaTypeIds);
            uwbObjectTypeService.deleteList(uwbObjectTypeIds);
            organizationUnitRepository.softDelete(organizationUnit.getId());
        }
    }

}
