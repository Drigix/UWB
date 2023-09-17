package com.uwb.clientserver.services.impl;

import com.uwb.clientserver.exceptions.ItemNotExistException;
import com.uwb.clientserver.mappers.OrganizationUnitMapper;
import com.uwb.clientserver.models.OrganizationUnit;
import com.uwb.clientserver.models.User;
import com.uwb.clientserver.models.request.OrganizationUnitRequest;
import com.uwb.clientserver.models.response.OrganizationUnitResponse;
import com.uwb.clientserver.models.response.OrganizationUnitTreeResponse;
import com.uwb.clientserver.repositories.OrganizationUnitRepository;
import com.uwb.clientserver.repositories.UserRepository;
import com.uwb.clientserver.services.OrganizationUnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OrganizationUnitServiceImpl implements OrganizationUnitService {

    private final OrganizationUnitMapper organizationUnitMapper;
    private final OrganizationUnitRepository organizationUnitRepository;
    private final UserRepository userRepository;

    @Override
    public OrganizationUnitResponse create(OrganizationUnitRequest request) {
        OrganizationUnit organizationUnit = organizationUnitMapper.toNewEntity(request);
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
        OrganizationUnit existOrganizationUnit = organizationUnitRepository.findById(organizationUnit.getId()).orElseThrow(() -> new ItemNotExistException(organizationUnit.getId()));
        OrganizationUnit organizationUnitToSave = setMissingValues(organizationUnit, existOrganizationUnit);
        return organizationUnitMapper.toResponse(organizationUnitRepository.save(organizationUnitToSave));
    }

    @Override
    public void delete(Long id) {
        String formattedStringId = ";" + id.toString() + ";";
        List<OrganizationUnit> organizationUnits = organizationUnitRepository.findAllForUser(formattedStringId, id);
        for(OrganizationUnit organizationUnit: organizationUnits) {
            organizationUnit.setDeleted(true);
            organizationUnitRepository.save(organizationUnit);
        }
    }

    private OrganizationUnit setMissingValues(OrganizationUnit request, OrganizationUnit unitData) {
        request.setCreatedBy(unitData.getCreatedBy());
        request.setCreatedDate(unitData.getCreatedDate());
        request.setDeleted(unitData.getDeleted());
        return request;
    }

}
