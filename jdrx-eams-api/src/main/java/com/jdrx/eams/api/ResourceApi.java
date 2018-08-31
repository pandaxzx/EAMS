package com.jdrx.eams.api;

import com.jdrx.basic.rbac.service.ResourceService;
import com.jdrx.eams.beans.dto.PageDTO;
import com.jdrx.platform.commons.rest.beans.dto.IdDTO;
import com.jdrx.platform.commons.rest.beans.vo.ResposeVO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.commons.rest.factory.ResponseFactory;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/rbac/resource")
@Api(value = "资源权限")
public class ResourceApi {
    @Autowired
    private ResourceService resourceService;

    @ApiOperation(value = "增加资源", notes = "增加资源")
    @RequestMapping(value = "/find", method = RequestMethod.POST)
    public ResposeVO findAll(@RequestBody PageDTO pageDTO) {
        return ResponseFactory.ok(resourceService.list());
    }

    @ApiOperation(value = "查询资源", notes = "查询资源")
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public ResposeVO getResource(@RequestBody IdDTO<Long> idDTO) {
        return ResponseFactory.ok(resourceService.findById(idDTO.getId()));
    }


    @ApiOperation(value = "更新资源", notes = "更新资源")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResposeVO updateUser(@RequestBody Map<String,Object> map) {
        resourceService.update(map);
        return ResponseFactory.ok("更新成功");
    }

    @ApiOperation(value = "删除资源", notes = "删除资源")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResposeVO deleteUser(@RequestBody IdDTO<Long> idDTO) throws BizException {
        resourceService.delete(idDTO.getId());
        return ResponseFactory.ok("删除成功");
    }

    @ApiOperation(value = "添加资源", notes = "添加资源")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResposeVO saveUser(@RequestBody Map<String,Object> map) throws BizException {
        resourceService.save(map);
        return ResponseFactory.ok("添加成功");
    }
}
