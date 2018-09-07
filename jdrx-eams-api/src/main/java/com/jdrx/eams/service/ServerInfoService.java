package com.jdrx.eams.service;

import com.jdrx.basic.rbac.dao.ExtendDao;
import com.jdrx.eams.dao.ServerInfoDAO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.jdbc.beans.vo.PageVO;
import com.jdrx.eams.beans.dto.PageDTO;
import com.jdrx.eams.beans.dto.ServerInfoDTO;
import com.jdrx.eams.beans.entry.ServerInfoPO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ServerInfoService {
    @Autowired
    private ServerInfoDAO serverInfoDAO;
    @Autowired
    private ExtendDao extendDao;

    /**
     * 从mysql获取所有环境和所有app
     * @param
     * @return List<Map<String, Object>>
     * */
    public List<Map<String, Object>> findTags(){

        return extendDao.queryList("envs.apps", new HashMap<>());

    }

    /**
     * 更新服务器信息(为服务器信息添加标签)
     *
     * @param serverInfoDTO
     * @return null
     */
    public void updateServer(ServerInfoDTO serverInfoDTO) throws BizException {
        if (serverInfoDTO.getEnvs()!=null||serverInfoDTO.getApps()!=null) {
            ServerInfoPO serverInfoPO = new ServerInfoPO();
            BeanUtils.copyProperties(serverInfoDTO,serverInfoPO);
            serverInfoDAO.upsert(serverInfoPO);
        }else {
            throw new BizException("标签信息为空");
        }
    }


    /**
     * 根据条件查询
     * @param serverInfoDTO
     * @return PageVO<ServerInfoPO>
     * */
    public PageVO<ServerInfoPO> findByCondition(ServerInfoDTO serverInfoDTO) throws BizException {
        if (serverInfoDTO.getIp()==null&&serverInfoDTO.getHost()==null&&serverInfoDTO.getApps()==null&&serverInfoDTO.getEnvs()==null) {
            return serverInfoDAO.findAll(serverInfoDTO.getPageNum(),serverInfoDTO.getPageSize());
        } else {
            ServerInfoPO serverInfoPO = new ServerInfoPO();
            BeanUtils.copyProperties(serverInfoDTO, serverInfoPO);
            return serverInfoDAO.findBy(serverInfoPO, serverInfoDTO.getPageNum(), serverInfoDTO.getPageSize());
        }
    }
    /**
     * 分页查询
     * @param pageDTO
     * @return PageVO
     * */
    public PageVO<ServerInfoPO> findAllServer(PageDTO pageDTO) throws BizException {
        if (pageDTO != null && pageDTO.getPageNum() != null) {
            PageVO<ServerInfoPO> pageVO = serverInfoDAO.findAll(pageDTO.getPageNum(), pageDTO.getPageSize());
            return pageVO;
        }else {
            throw new BizException("查找失败");
        }
    }
}