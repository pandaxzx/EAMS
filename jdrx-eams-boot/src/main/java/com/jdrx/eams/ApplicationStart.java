package com.jdrx.eams;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;

@SpringBootApplication
@ComponentScan(basePackages = "com.jdrx")
public class ApplicationStart implements CommandLineRunner {
    @Autowired
    private JedisConnectionFactory jedisConnectionFactory;

    @Bean
    public StringRedisTemplate redisTemplate() {
        StringRedisTemplate stringRedisTemplate = new StringRedisTemplate();
        stringRedisTemplate.setConnectionFactory(jedisConnectionFactory);
        return stringRedisTemplate;
    }


    public static void main(String[] args) {
        ApplicationContext applicationContext = SpringApplication.run(ApplicationStart.class);
    }


    @Override
    public void run(String... strings) throws Exception {

    }
}
