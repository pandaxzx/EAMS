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

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/server",method = RequestMethod.POST)
@Api(value = "服务器资源信息")
public class ServerApi {
    @Autowired
    private ServerInfoService serverInfoService;

    @Autowired
    private ServerStatusService serverStatusService;

    @ApiOperation(value = "删除主机", notes = "删除主机")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResposeVO deleteServer(@RequestBody IdDTO idDTO) throws BizException {
        serverInfoService.deleteServer(idDTO);
        return ResponseFactory.ok("删除成功");
    }


    @ApiOperation(value = "查询所有环境和App", notes = "查询所有环境和App")
    @RequestMapping(value = "/findTags", method = RequestMethod.POST)
    public ResposeVO findTags() throws BizException {
        return ResponseFactory.ok(serverInfoService.findTags());
    }

    @ApiOperation(value = "根据条件查询", notes = "根据条件查询")
    @RequestMapping(value = "/findBy", method = RequestMethod.POST)
    public ResposeVO findServerByCondition(@RequestBody ServerInfoDTO serverInfoDTO) throws BizException {
        return ResponseFactory.ok(serverInfoService.findByCondition(serverInfoDTO));
    }

    @ApiOperation(value = "分页查询服务器信息", notes = "分页查询服务器信息")
    @RequestMapping(value = "/findAll", method = RequestMethod.POST)
    public ResposeVO findAllServerInfo(@RequestBody PageDTO pageDTO) throws BizException {
        return ResponseFactory.ok(serverInfoService.findAllServer(pageDTO));
    }

    @ApiOperation(value = "更新服务器信息", notes = "更新服务器信息")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResposeVO update(@RequestBody ServerInfoDTO serverInfoDTO) throws BizException {
        serverInfoService.updateServer(serverInfoDTO);
        return ResponseFactory.ok("更新成功");
    }

    @ApiOperation(value = "打开网页时获取服务器状态", notes = "打开网页时获取服务器状态")
    @RequestMapping(value = "/findStatus", method = RequestMethod.POST)
    public ResposeVO findServerStatus(@RequestBody List<String> ipList) throws BizException {
        return ResponseFactory.ok(serverStatusService.findServerStatus(ipList));
    }

    @ApiOperation(value = "获取服务器实时信息", notes = "获取服务器实时信息")
    @RequestMapping(value = "/getStatus", method = RequestMethod.POST)
    public ResposeVO getServerStatus(@RequestBody IdDTO<String> idDTO) throws BizException {
        return ResponseFactory.ok(serverStatusService.getServerStatus(idDTO));

    }

}
