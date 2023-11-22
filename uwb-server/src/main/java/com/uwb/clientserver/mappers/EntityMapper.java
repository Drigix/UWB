package com.uwb.clientserver.mappers;

import java.util.List;

/**

 
Contract for a generic dto to entity mapper.*
    @param <RQ> - request type parameter.


    @param <E> - Entity type parameter.

    @param <RE> - response type parameter.
 */

 public interface EntityMapper <RQ, E, RE> {

    E toEntity(RQ request);

    RE toResponse(E entity);

    List<E> toEntityList(List<RQ> requestList);

    List <RE> toResponseList(List<E> entityList);
}