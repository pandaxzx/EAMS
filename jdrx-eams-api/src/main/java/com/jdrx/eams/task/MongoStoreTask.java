package com.jdrx.eams.task;

import com.google.common.collect.Lists;
import com.jdrx.eams.beans.bo.RedisQueue;
import com.jdrx.eams.service.RedisConsumeBGService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;

/**
 * @description 处理 redis 队列中的元素
 *
 * @author dengfan
 * @version 1.0
 * @date 2018/8/28 0028 16:04
 */

public class MongoStoreTask implements Runnable {

    private final static Logger logger = LoggerFactory.getLogger(MongoStoreTask.class);
//    private MongoDao mongoDao;
    private final RedisConsumeBGService container;
    private final RedisQueue<String> redisQueue;
    private final Consumer consumer;

    public MongoStoreTask(@NotNull RedisConsumeBGService container, @NotNull Consumer consumer){
        this.container = container;
        this.redisQueue = container.getRedisQueue();
        this.consumer = consumer;
    }

    @Override
    public void run() {
        try{
            while(true){
                if(Thread.currentThread().isInterrupted()){
                    logger.warn("线程中断");
                    break;
                }
                String value = redisQueue.blockLPop();
                //逐个执行
                if( !StringUtils.isEmpty(value) ){
                    try{
                        consumer.accept(value);
                    }catch(Exception e){
                        logger.error("调用失败", e);
                    }
                }
            }
        }catch(Exception e){
            //todo
            logger.error("轮循线程异常退出", e);
            container.autoRestart();
        }
    }
}
