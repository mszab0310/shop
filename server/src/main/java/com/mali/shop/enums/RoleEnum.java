package com.mali.shop.enums;

import java.util.Arrays;

public enum RoleEnum {
    ROLE_USER(Names.USER),
    ROLE_ADMIN(Names.ADMIN),
    ROLE_RECRUITER(Names.RECRUITER);

    public String name;

    RoleEnum(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static RoleEnum fromValue(String val) {
        return  Arrays.stream(values()).filter(v -> v.name.equalsIgnoreCase(val)).findFirst().get();
    }

    public static class Names {
        public static final String USER = "ROLE_USER";
        public static final String ADMIN = "ROLE_ADMIN";
        public static final String RECRUITER = "ROLE_RECRUITER";
    }
}
