package com.mali.shop.exceptions;

public class UserException extends BaseCustomException {
    public static final String EMAIL_TAKEN = "Another user already exists with that email";
    public static final String USERNAME_TAKEN = "Another user already exists with that username";
    public static final String USER_NOT_FOUND = "Can not find user with this email";

    public static final String INCOMPLETE_FIELDS = "Not all required fields were filled with data for register/signin";
    public static final String BAD_CREDENTIALS = "Incorrect credentials";

    public UserException(String message){
        super(message);
    }


}
