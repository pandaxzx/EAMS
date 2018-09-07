package com.jdrx.eams.config;

import org.springframework.stereotype.Service;

@Service
public class RedisReceiver {
    public void receiveMessage(String message) {
        System.out.println(message);
    }
}
