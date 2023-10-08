package com.uwb.clientserver.models;

import com.uwb.clientserver.models.area.Area;
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
@Table(name = "background")
public class Background extends BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 50)
    private String name;

    @Column(updatable = false)
    private String fileName;

    @Column(updatable = false)
    private Double fileSize;

    @Column(updatable = false)
    private String path;

    private Double scale;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "organization_unit_id", nullable = false)
    private OrganizationUnit organizationUnit;

    @OneToMany(mappedBy = "background")
    private List<Area> areas;

    @OneToMany(mappedBy = "background")
    private List<Anchor> anchors;
}
