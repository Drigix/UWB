package com.uwb.clientserver.models.object;

import com.uwb.clientserver.models.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "uwb_object_icon")
public class UwbObjectIcon extends BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 30)
    private String name;

    @Column(updatable = false)
    private String fileName;

    @Column(updatable = false)
    private Double fileSize;

    @Column(updatable = false)
    private String path;

    private Long organizationUnitId;

    @OneToMany(mappedBy = "uwbObjectIcon")
    private List<UwbObjectType> uwbObjectTypes;
}
