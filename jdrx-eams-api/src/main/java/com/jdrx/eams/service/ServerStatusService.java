package com.jdrx.eams.service;

import com.jdrx.eams.beans.dto.ServerStatusDTO;
import com.jdrx.eams.dao.ServerStatusDAO;
import com.jdrx.platform.commons.rest.beans.dto.IdDTO;
import com.jdrx.platform.commons.rest.exception.BizException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServerStatusService {
    @Autowired
    private ServerStatusDAO serverStatusDAO;
    /**
     * 获取实时信息
     * @param
     * @return ServerStatusDTO
     * */
    public ServerStatusDTO getServerStatus(IdDTO<String> idDTO) throws BizException {
        if(idDTO.getId()!=null){
            ServerStatusDTO serverStatusDTO = serverStatusDAO.get(idDTO.getId());
            return serverStatusDTO;
        }else {
            throw new BizException("ip不能为空");
        }
    }
    /**
     * 获取实时信息
     *
     * @param
     * @return ServerStatusDTO
     */
    public List<ServerStatusDTO> findServerStatus(List<String> ipList) throws BizException {
        if (ipList != null) {
            return serverStatusDAO.find(ipList);
        }else {
            throw new BizException("ip不能为空");
        }
    }
}
