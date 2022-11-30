package com.mali.shop.exceptions;

public class UserException extends BaseCustomException {
    public static final String EMAIL_TAKEN = "Another user already exists with that email";
    public static final String USER_NOT_FOUND = "Can not find user with this email";

    public UserException(String message){
        super(message);
    }


}
