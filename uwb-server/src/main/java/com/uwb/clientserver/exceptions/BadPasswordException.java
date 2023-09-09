package com.uwb.clientserver.exceptions;

public class BadPasswordException extends RuntimeException {

    public BadPasswordException() {
        super("Password is not correct!");
    }

    public BadPasswordException(String message) {
        super(message);
    }
}
