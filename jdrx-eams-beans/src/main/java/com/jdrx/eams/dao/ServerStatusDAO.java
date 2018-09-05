package com.jdrx.eams.dao;

import com.jdrx.eams.beans.dto.ServerStatusDTO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.commons.rest.utils.JsonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ServerStatusDAO {
    @Autowired
    private StringRedisTemplate redisTemplate;

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

    public List<ServerStatusDTO> find(List<String> ipList) throws BizException {
        JsonMapper mapper = new JsonMapper();
        List<ServerStatusDTO> serverInfoList = new ArrayList<>();
        try {
            List<String> stringList = redisTemplate.opsForValue().multiGet(ipList);
            for (String string : stringList) {
                if(string!=null){
                    ServerStatusDTO serverStatusDTO = mapper.readValue(string, ServerStatusDTO.class);
                    serverInfoList.add(serverStatusDTO);
                }else {
                    serverInfoList.add(null);
                }
            }
            return serverInfoList;
        } catch (Exception e) {
            throw new BizException("读取失败");
        }
    }
}
