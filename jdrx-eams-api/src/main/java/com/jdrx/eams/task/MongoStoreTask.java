package com.jdrx.eams.task;

import com.jdrx.eams.beans.bo.RedisQueue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.constraints.NotNull;
import java.util.function.Consumer;

/**
 * @description 处理 redis 队列中的元素
 *
 * @author dengfan
 * @version 1.0
 * @date 2018/8/28 0028 16:04
 */

public class MongoStoreTask<T> implements Runnable {

    private final static Logger logger = LoggerFactory.getLogger(MongoStoreTask.class);
    private final RedisQueue<T> redisQueue;
    private final Consumer<T> consumer;
    private final Consumer beforeWork ;
    private final Consumer exHandler;

    public MongoStoreTask(@NotNull RedisQueue<T> redisQueue, @NotNull Consumer<T> consumer){
        this(redisQueue,consumer,null,null);
    }

    public MongoStoreTask(@NotNull RedisQueue<T> redisQueue, @NotNull Consumer<T> consumer, Consumer beforeWork, Consumer exHandler){
        this.redisQueue = redisQueue;
        this.consumer = consumer;
        this.beforeWork = beforeWork;
        this.exHandler = exHandler;
    }

    @Override
    public void run() {
        try{
            beforeWork();
            T value = null;
            while(true){
                if(Thread.currentThread().isInterrupted()){
                    logger.warn("线程中断");
                    break;
                }
                try {
                    value = redisQueue.blockLPop();
                }catch (InterruptedException e){
                    //todo
                    Thread.currentThread().interrupt();
                }
                try{
                    consumer.accept(value);
                }catch(Exception e){
                    logger.error("处理失败", e);
                }
            }
        }catch(Exception e){
            //todo
            logger.error("轮循线程异常退出", e);
            afterExit();
        }finally {
//            redisQueue 释放资源
            logger.info("线程工作结束");
        }
    }

    /**
     * 开始任务之前需要执行
     */
    private void beforeWork(){
        if( null != beforeWork){
            beforeWork.accept(this);
        }
    }

    /**
     * 停止之后需要执行的任务
     */
    private void afterExit(){
        if( null != exHandler){
            exHandler.accept(this);
        }
    }
}
