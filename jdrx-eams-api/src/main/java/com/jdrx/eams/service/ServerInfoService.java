package com.jdrx.eams.service;

import com.jdrx.eams.dao.ServerInfoDAO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.jdbc.beans.vo.PageVO;
import com.jdrx.eams.beans.dto.PageDTO;
import com.jdrx.eams.beans.dto.ServerInfoDTO;
import com.jdrx.eams.beans.entry.ServerInfoPO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServerInfoService {
    @Autowired
    private ServerInfoDAO serverInfoDAO;

    /*
     * 根据条件查询
     * @param ServerInfoDTO
     * @return PageVO<ServerInfoPO>
     * */
    public PageVO<ServerInfoPO> findByCondition(ServerInfoDTO serverInfoDTO) throws BizException {
        if (serverInfoDTO.getIp()== null && serverInfoDTO.getHost() == null) {
            return serverInfoDAO.findAll(serverInfoDTO.getPageNum(),serverInfoDTO.getPageSize());
        } else {
            ServerInfoPO serverInfoPO = new ServerInfoPO();
            BeanUtils.copyProperties(serverInfoDTO, serverInfoPO);
            return serverInfoDAO.findBy(serverInfoPO, serverInfoDTO.getPageNum(), serverInfoDTO.getPageSize());
        }
    }


     /** 插入基本信息
     * @param serverInfoDTO
     * */
    public void saveServerInfo(ServerInfoDTO serverInfoDTO) throws BizException {
        if (serverInfoDTO != null && serverInfoDTO.getIp() != null) {
            ServerInfoPO serverInfoPO = new ServerInfoPO();
            BeanUtils.copyProperties(serverInfoDTO, serverInfoPO);
            serverInfoDAO.save(serverInfoPO);
        } else {
            throw new BizException("主机信息为空");
        }
    }

    /*
     * 分页查询
     * @param pageDTO
     * @return PageVO
     * */
    public PageVO<ServerInfoPO> findAllServer(PageDTO pageDTO) throws BizException {
        if (pageDTO != null&&pageDTO.getPageNum()!=null) {
            PageVO<ServerInfoPO> pageVO = serverInfoDAO.findAll(pageDTO.getPageNum(), pageDTO.getPageSize());
            return pageVO;
        }else {
            throw new BizException("查找失败");
        }
    }



}
