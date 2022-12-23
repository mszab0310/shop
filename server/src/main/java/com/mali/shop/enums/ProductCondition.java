package com.mali.shop.enums;

import java.util.Arrays;
import java.util.List;

public class ProductCondition {
    public static final String NEW = "New";
    public static final String AS_NEW = "As new";
    public static final String USED = "Used";
    public static final String HEAVILY_USED = "Heavily used";

    public static List<String> getProductConditions(){
        return Arrays.asList(NEW,AS_NEW,USED,HEAVILY_USED);
    }
}
