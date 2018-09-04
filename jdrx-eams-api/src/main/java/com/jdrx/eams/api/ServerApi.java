package com.jdrx.eams.api;

import com.jdrx.eams.beans.dto.PageDTO;
import com.jdrx.eams.service.ServerInfoService;
import com.jdrx.platform.commons.rest.beans.dto.IdDTO;
import com.jdrx.platform.commons.rest.beans.vo.ResposeVO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.commons.rest.factory.ResponseFactory;
import com.jdrx.eams.beans.dto.ServerInfoDTO;
import com.jdrx.eams.service.ServerStatusService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/server",method = RequestMethod.POST)
@Api(value = "服务器资源信息")
public class ServerApi {
    @Autowired
    private ServerInfoService serverInfoService;

    @Autowired
    private ServerStatusService serverStatusService;

    @ApiOperation(value = "根据条件查询", notes = "根据条件查询")
    @RequestMapping(value = "/findServer", method = RequestMethod.POST)
    public ResposeVO findServerByCondition(@RequestBody ServerInfoDTO serverInfoDTO) throws BizException {
        return ResponseFactory.ok(serverInfoService.findByCondition(serverInfoDTO));
    }

    @ApiOperation(value = "获取服务器实时信息", notes = "获取服务器实时信息")
    @RequestMapping(value = "/getStatus", method = RequestMethod.POST)
    public ResposeVO getServerStatus(@RequestBody IdDTO<String> idDTO) throws BizException {
        return ResponseFactory.ok(serverStatusService.getServerStatus(idDTO));

    }

    @ApiOperation(value = "插入服务器信息", notes = "插入服务器信息")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResposeVO saveServerInfo(@RequestBody ServerInfoDTO serverInfoDTO) throws BizException {
        serverInfoService.saveServerInfo(serverInfoDTO);
        return ResponseFactory.ok("插入成功");
    }

    @ApiOperation(value = "分页查询服务器信息", notes = "分页查询服务器信息")
    @RequestMapping(value = "/finAll", method = RequestMethod.POST)
    public ResposeVO findAllServerInfo(@RequestBody PageDTO pageDTO) throws BizException {
        return ResponseFactory.ok(serverInfoService.findAllServer(pageDTO));
    }




}
