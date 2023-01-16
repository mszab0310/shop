package com.mali.shop.exceptions;

import org.apache.kafka.common.protocol.types.Field;

public class PasswordResetException extends BaseCustomException{
    public static final String TOKEN_NOT_FOUND = "Token not found";
    public static final String TOKEN_EXPIRED = "Token expired";
    public static final String TOKEN_NOT_VERIFIED = "Token not verified";
    public static final String PASSWORDS_MATCH = "Old password can't be the new one";
    public static final String NEW_PASSWORD_DIFFERENT = "New password does not match confirmation password";
    public PasswordResetException(String message) {
        super(message);
    }
}
