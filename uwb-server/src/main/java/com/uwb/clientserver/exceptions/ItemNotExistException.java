package com.uwb.clientserver.exceptions;

public class ItemNotExistException extends RuntimeException {
    public ItemNotExistException(Long id) {
        super("Item with ID: " + id.toString() + " not exist!");
    }

    public ItemNotExistException(String message) {
        super(message);
    }
}
