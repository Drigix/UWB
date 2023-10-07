package com.uwb.clientserver.models;

import com.uwb.clientserver.models.area.AreaType;
import com.uwb.clientserver.models.object.UwbObjectType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "organization_unit")
public class OrganizationUnit extends BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 100)
    private String name;

    private Long parentOrganizationUnitId;

    private String treePath;

    @OneToMany(mappedBy = "organizationUnit")
    private List<User> users;

    @OneToMany(mappedBy = "organizationUnit")
    private List<Background> backgrounds;

    @OneToMany(mappedBy = "organizationUnit")
    private List<UwbObjectType> uwbObjectTypes;

    @OneToMany(mappedBy = "organizationUnit")
    private List<AreaType> areaTypes;
}
