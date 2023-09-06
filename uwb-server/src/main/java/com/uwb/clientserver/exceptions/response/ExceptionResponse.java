package com.uwb.clientserver.exceptions.response;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
public class ExceptionResponse {
    private String message;

    public ExceptionResponse(String message) {
        super();
        this.message = message;
    }
}
