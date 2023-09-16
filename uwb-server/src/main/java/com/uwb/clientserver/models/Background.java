package com.uwb.clientserver.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@Data
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

    private String name;

    private String fileName;

    private Double fileSize;

    private String path;

    private Double scale;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "organization_unit_id", nullable = false)
    private OrganizationUnit organizationUnit;
}
