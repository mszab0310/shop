package com.mali.shop.exceptions;

public class InternshipException extends BaseCustomException {
    public static final String INTERNSHIP_NOT_FOUND = "Internship not found";
    public static final String INTERNSHIP_ACTION_INVALID = "Invalid action for internship";
    public static final String INTERNSHIP_EXPIRED = "Internship has expired";

    public InternshipException(String message) {
        super(message);
    }
}
