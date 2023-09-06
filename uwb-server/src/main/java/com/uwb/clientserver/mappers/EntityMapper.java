package com.uwb.clientserver.mappers;

import java.util.List;

/**

 
Contract for a generic dto to entity mapper.*
@param <D> - DTO type parameter.

 
@param <E> - Entity type parameter.

 */

 public interface EntityMapper <D, E> {

    E toEntity(D dto);

    D toResponse(E entity);

     List<E> toEntity(List<D> dtoList);

     List <D> toResponse(List<E> entityList);

}