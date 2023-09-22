package com.uwb.clientserver.models.object;

import com.uwb.clientserver.models.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "uwb_object")
public class UwbObject extends BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 30)
    private String name;

    @Size(min = 2, max = 30)
    private String secondName;

    @Size(min = 2, max = 20)
    private String hexTagId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "uwb_object_type_id", nullable = false)
    private UwbObjectType uwbObjectType;
}
