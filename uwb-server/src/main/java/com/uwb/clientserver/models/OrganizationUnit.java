package com.uwb.clientserver.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;
import java.util.List;

@Data
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

    private String name;

    private Long parentOrganizationUnitId;

    private String treePath;

    @OneToMany(mappedBy = "organizationUnit")
    private List<User> users;
}
