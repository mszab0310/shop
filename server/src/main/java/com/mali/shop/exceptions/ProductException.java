package com.mali.shop.exceptions;

public class ProductException extends BaseCustomException {
    public static final String PRODUCT_NOT_FOUND = "Product not found";
    public static final String PRODUCT_BID_INVALID = "The submitted bid does not beat the current highest bid";
    public static final String BID_ON_OWN_PRODUCT = "You can not bid on your own listing";
    public static final String PRODUCT_EXPIRED = "You can not bid on an expired product";

    public ProductException(String message) {
        super(message);
    }
}
