package com.jdrx.platform.sample.config;

import org.springframework.stereotype.Service;

@Service
public class RedisReceiver {

    public void receiveMessage(String message) {
        System.out.println(message);
    }
}
