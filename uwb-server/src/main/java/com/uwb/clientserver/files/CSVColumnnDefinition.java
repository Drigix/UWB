package com.uwb.clientserver.files;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.function.Function;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CSVColumnnDefinition <T> {
    private String fieldName;
    private String columnHeader;
    private Function<T, String> fieldGetterExpression;
}
