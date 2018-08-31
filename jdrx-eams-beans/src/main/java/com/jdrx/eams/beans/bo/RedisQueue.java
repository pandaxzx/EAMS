package com.jdrx.eams.beans.bo;

import com.google.common.collect.Lists;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.BoundListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.CollectionUtils;

import javax.validation.constraints.NotNull;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.locks.ReentrantLock;

/**
 * @author dengfan
 * @version 1.0
 * @description
 * @date 2018/8/29 0029 09:01
 */
public class RedisQueue<T> {

    private BoundListOperations<String,T> boundListOperations;
    private ReentrantLock lock;
    private final RedisTemplate redisTemplate;
    private final byte[] queueKey;

    public RedisQueue(@NotNull RedisTemplate redisTemplate, @NotBlank String queueKey) {
        this.redisTemplate = redisTemplate;
//        this.queueKey = redisTemplate.getKeySerializer().serialize(queueKey);
        this.queueKey = queueKey.getBytes(StandardCharsets.UTF_8);
        boundListOperations = redisTemplate.boundListOps(queueKey);
        lock = new ReentrantLock();
    }

    /**
     * 以阻塞方式获取队列头部的元素
     *
     * @param timeout 超时时间,为负数永不超时
     * @return 超时或者为空返回 null, 否则返回实体
     * @throws InterruptedException
     */
    public T blockLPop(int timeout) throws InterruptedException {
        if(0 > timeout){
            return null;
        }
        lock.lockInterruptibly();
        T result = null;
        RedisConnectionFactory connectionFactory = redisTemplate.getConnectionFactory();
        RedisConnection connection = connectionFactory.getConnection();
        try {
            List<byte[]> bytesList = connection.bLPop(timeout, queueKey);
            if( !CollectionUtils.isEmpty(bytesList) ){
                result = (T) new String(bytesList.get(1),StandardCharsets.UTF_8);
            }
        } catch (Exception e) {
            // todo
            e.printStackTrace();
        }finally {
            connection.close();
            lock.unlock();
        }
        return result;
    }

    public T blockLPop() throws InterruptedException {
        return blockLPop(0);
    }

    /**
     * 返回队列中的所有元素,并清空队列
     *
     * @return 元素集合
     */
    public List<T> popAll() throws InterruptedException {
        lock.lockInterruptibly();
        List<T> resultList = null;
        RedisConnectionFactory connectionFactory = redisTemplate.getConnectionFactory();
        RedisConnection connection = connectionFactory.getConnection();

        try {
            List<byte[]> bytesList = connection.lRange(queueKey, 0L, -1L);
            if( CollectionUtils.isEmpty(bytesList) ){
//                resultList = Collections.emptyList();
                return Collections.emptyList();
            }
            resultList = new ArrayList<>(bytesList.size());
            for(byte[] bytes:bytesList){
                resultList.add((T)redisTemplate.getValueSerializer().deserialize(bytes));
            }
            connection.lTrim(queueKey,0L,0L);
            connection.lPop(queueKey);

        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            connection.close();
            lock.unlock();
        }
        return resultList;
    }
}
