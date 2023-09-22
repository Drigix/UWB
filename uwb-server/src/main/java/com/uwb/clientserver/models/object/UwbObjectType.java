package com.uwb.clientserver.models.object;

import com.uwb.clientserver.models.BaseEntity;
import com.uwb.clientserver.models.OrganizationUnit;
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
@Table(name = "uwb_object_type")
public class UwbObjectType extends BaseEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 50)
    private String name;

    private Boolean adminOnly;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "organization_unit_id", nullable = false)
    private OrganizationUnit organizationUnit;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "uwb_object_icon_id", nullable = false)
    private UwbObjectIcon uwbObjectIcon;

    @OneToMany(mappedBy = "uwbObjectType")
    private List<UwbObject> uwbObjects;
}
