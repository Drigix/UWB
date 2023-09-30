package com.uwb.clientserver.exceptions;

public class ItemWithIdExist extends RuntimeException {
    public ItemWithIdExist(Long id) {
        super("Item with ID: " + id.toString() + " already exist!");
    }

    public ItemWithIdExist(String message) {
        super(message);
    }
}
