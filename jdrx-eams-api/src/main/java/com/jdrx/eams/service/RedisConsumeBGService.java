package com.jdrx.eams.service;

import com.jdrx.eams.beans.bo.RedisQueue;
import com.jdrx.eams.dao.ServerInfoDAO;
import com.jdrx.eams.task.MongoStoreTask;
import com.jdrx.platform.commons.rest.exception.BizException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;

/**
 * @version 1.0
 * @description 后台监听 redis 队列,保存到 mongo
 * @author dengfan
 * @date 2018/8/28 0028 14:34
 */
@Service
public class RedisConsumeBGService {

    private Logger logger = LoggerFactory.getLogger(RedisConsumeBGService.class);
    private final static String QUEUE_KEY = "queue:servers_info";
    private final static int MAX_RESTART_COUNT = 10;
    private ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);
    private int restartCount ;
    private Thread worker;
    private RedisQueue<String> redisQueue;

    @Autowired private ServerInfoDAO serverInfoDAO;
    @Autowired private RedisTemplate redisTemplate;

    @PostConstruct
    private void init(){
        redisQueue = new RedisQueue<>(redisTemplate,QUEUE_KEY);
        Consumer<String> queueConsumer= (val)->{
            try {
                serverInfoDAO.upsert(val);
            } catch (BizException e) {
                // todo
                logger.warn("插入失败");
            }
        };
        Consumer beforeWork = (obj)->{
            logger.info("listen queue:servers_info start");
        };
        Consumer exitWithExHandler = (obj)->{
            logger.info("listen queue:servers_info stop");
            this.autoRestart();
        };
        MongoStoreTask<String> task = new MongoStoreTask<>(redisQueue,queueConsumer,beforeWork,exitWithExHandler);
        this.worker = new Thread(task);
        worker.setDaemon(true);
        worker.setName("T-RedisQueueService");
        start();
    }

    /**
     * 启动监听线程
     */
    public void start(){
        start(0L);
    }

    /**
     * 延迟启动后台监听线程
     *
     * @param delay 延迟时间
     */
    public void start(long delay){
        executorService.schedule(worker, delay, TimeUnit.SECONDS);
    }

    /**
     * 手动重启监听服务接口
     */
    public void restart(){
        restart(0L);
    }

    /**
     * 延迟重启服务
     *
     * @param delay
     */
    public void restart(long delay){
        stop();
        start(delay);
    }

    /**
     * 自动重启监听线程,超出最大重启次数停止
     *
     */
    public void autoRestart(){
        if(MAX_RESTART_COUNT >= restartCount){
            restart( 60L * restartCount);
            ++restartCount;
        }else{
            logger.warn("重启次数达到上限");
        }
    }

    /**
     * 归零重启次数
     */
    public void clearRestartCount(){
        restartCount = 0;
    }

    /**
     * 中断停止后台监听
     */
    public void stop(){
        if (worker.isAlive()) {
            worker.interrupt();
            clearRestartCount();
        }
    }

    /**
     * 返回 redis 队列
     *
     * @return redisQueue
     */
    public RedisQueue<String> getRedisQueue(){
        return redisQueue;
    }

    /**
     *
     * @return
     */
    public String getQueueKey(){
        return QUEUE_KEY;
    }
}
