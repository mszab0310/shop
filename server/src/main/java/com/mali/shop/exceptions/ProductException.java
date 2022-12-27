package com.mali.shop.exceptions;

public class ProductException extends BaseCustomException {
    public static final String PRODUCT_NOT_FOUND = "Product not found";

    public ProductException(String message) {
        super(message);
    }
}
