package com.uwb.clientserver.models.area;

import com.uwb.clientserver.models.Background;
import com.uwb.clientserver.models.BaseEntity;
import com.uwb.clientserver.models.notification.NotificationConfig;
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
@Table(name = "area")
public class Area extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 50)
    private String name;

    @Size(min = 5, max = 10)
    private String color;

    @ManyToOne
    @JoinColumn(name = "background_id", nullable = false)
    private Background background;

    @ManyToOne
    @JoinColumn(name = "area_type_id", nullable = false)
    private AreaType areaType;

    @OneToMany(mappedBy = "area")
    private List<AreaVertex> areaVertexes;

    @ManyToMany(mappedBy = "areas")
    private List<NotificationConfig> notificationConfigs;
}
