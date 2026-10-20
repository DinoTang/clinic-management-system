package com.clinic.management._auth.mappers;

import com.clinic.management._auth.dtos.GoogleUserInfo;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class GoogleUserMapper {

    public GoogleUserInfo toDto(Map<String, Object> attributes) {
        return new GoogleUserInfo(
            getString(attributes, "sub"),
            getString(attributes, "email"),
            getString(attributes, "name"),
            getString(attributes, "picture")
        );
    }

    private String getString(
            Map<String, Object> attributes,
            String key) {

        Object value = attributes.get(key);

        return value instanceof String stringValue
                ? stringValue
                : null;
    }
}