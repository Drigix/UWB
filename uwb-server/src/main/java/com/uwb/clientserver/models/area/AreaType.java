package com.uwb.clientserver.models.area;

import com.uwb.clientserver.models.BaseEntity;
import com.uwb.clientserver.models.OrganizationUnit;
import com.uwb.clientserver.models.object.UwbObjectType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "area_type")
public class AreaType extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 50)
    private String name;

    @Size(min = 5, max = 10)
    private String color;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "organization_unit_id", nullable = false)
    private OrganizationUnit organizationUnit;

    @OneToMany(mappedBy = "areaType")
    private List<Area> areas;
}
