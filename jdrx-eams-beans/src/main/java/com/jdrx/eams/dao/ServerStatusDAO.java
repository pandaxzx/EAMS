package com.jdrx.eams.dao;

import com.jdrx.eams.beans.dto.ServerStatusDTO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.commons.rest.utils.JsonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class ServerStatusDAO {
    @Autowired
    private RedisTemplate redisTemplate;

    public ServerStatusDTO get(String ip) throws BizException {
        JsonMapper mapper = new JsonMapper();
        try {
            String serverStatusString = (String) redisTemplate.opsForValue().get(ip);
            if (serverStatusString != null) {
                ServerStatusDTO serverStatusDTO = mapper.readValue(serverStatusString, ServerStatusDTO.class);
                return serverStatusDTO;
            }
            return null;
        } catch (Exception e) {
            throw new BizException("读取失败");
        }
    }
}
