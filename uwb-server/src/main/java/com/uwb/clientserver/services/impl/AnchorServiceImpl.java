package com.uwb.clientserver.services.impl;

import com.uwb.clientserver.exceptions.ItemWithIdExist;
import com.uwb.clientserver.mappers.AnchorMapper;
import com.uwb.clientserver.models.Anchor;
import com.uwb.clientserver.models.Background;
import com.uwb.clientserver.models.request.AnchorRequest;
import com.uwb.clientserver.models.response.AnchorResponse;
import com.uwb.clientserver.repositories.AnchorRepository;
import com.uwb.clientserver.repositories.BackgroundRepository;
import com.uwb.clientserver.services.AnchorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class AnchorServiceImpl implements AnchorService {

    private final AnchorMapper anchorMapper;
    private final AnchorRepository anchorRepository;
    private final BackgroundRepository backgroundRepository;

    @Override
    public AnchorResponse create(AnchorRequest request) {
        anchorRepository.findByName(request.getName()).ifPresent(a -> { throw new ItemWithIdExist("Anchor with ID: " + a.getName() + " already exist!") ;});
        Anchor anchor = anchorMapper.toEntity(request);
        setScaleCoordinates(anchor);
        return anchorMapper.toResponse(anchorRepository.save(anchor));
    }

    @Override
    @Transactional(readOnly = true)
    public List<AnchorResponse> findAll() {
        return anchorMapper.toResponseList(anchorRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<AnchorResponse> findAllByBackground(Long id) {
        return anchorMapper.toResponseList(anchorRepository.findAllByBackgroundIdAndDeletedFalse(id));
    }

    @Override
    @Transactional(readOnly = true)
    public AnchorResponse findOneByName(String name) {
        return anchorMapper.toResponse(anchorRepository.findByName(name).orElse(null));
    }

    @Override
    public AnchorResponse update(AnchorRequest request) {
        Anchor anchor = anchorMapper.toEntity(request);
        setScaleCoordinates(anchor);
        return anchorMapper.toResponse(anchorRepository.save(anchor));
    }

    @Override
    public void delete(Long id) {
        anchorRepository.softDelete(id);
    }

    @Override
    public void deleteList(List<Long> ids) {
        for(Long id: ids) {
            delete(id);
        }
    }

    private void setScaleCoordinates(Anchor anchor) {
        Background background = backgroundRepository.findById(anchor.getBackground().getId()).orElse(null);
        if(null != Objects.requireNonNull(background).getScale()) {
            anchor.setXPx(anchor.getX() * background.getScale());
            anchor.setYPx(anchor.getY() * background.getScale());
        } else {
            anchor.setXPx(anchor.getX());
            anchor.setYPx(anchor.getY());
        }
    }
}
