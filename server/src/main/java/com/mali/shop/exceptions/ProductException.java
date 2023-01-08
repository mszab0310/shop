package com.mali.shop.exceptions;

public class ProductException extends BaseCustomException {
    public static final String PRODUCT_NOT_FOUND = "Product not found";
    public static final String PRODUCT_BID_INVALID = "The submitted bid does not beat the current highest bid";

    public ProductException(String message) {
        super(message);
    }
}
