package com.jdrx.eams.api;


import com.jdrx.basic.rbac.service.RoleService;
import com.jdrx.eams.beans.dto.PageDTO;
import com.jdrx.platform.commons.rest.beans.dto.IdDTO;
import com.jdrx.platform.commons.rest.beans.vo.ResposeVO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.commons.rest.factory.ResponseFactory;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/rbac/role")
@Api(value = "角色权限")
public class RoleApi {

    @Autowired
    private RoleService roleService;

    @ApiOperation(value = "增加角色", notes = "增加角色")
    @RequestMapping(value = "/find", method = RequestMethod.POST)
    public ResposeVO findAll(@RequestBody PageDTO pageDTO) {
        return ResponseFactory.ok(roleService.list(null));
    }

    @ApiOperation(value = "查询角色", notes = "查询角色")
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public ResposeVO getResource(@RequestBody IdDTO<Long> idDTO) {
        return ResponseFactory.ok(roleService.findById(idDTO.getId()));
    }


    @ApiOperation(value = "更新角色", notes = "更新角色")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResposeVO updateUser(@RequestBody Map<String,Object> map) {
        roleService.update(map);
        return ResponseFactory.ok("更新成功");
    }

    @ApiOperation(value = "删除角色", notes = "删除角色")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResposeVO deleteUser(@RequestBody IdDTO<Long> idDTO) throws BizException {
        roleService.deleteById(idDTO.getId());
        return ResponseFactory.ok("删除成功");
    }

    @ApiOperation(value = "添加角色", notes = "添加角色")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResposeVO saveUser(@RequestBody Map<String,Object> map) throws BizException {
        roleService.save(map);
        return ResponseFactory.ok("添加成功");
    }


    @ApiOperation(value = "授权资源", notes = "分配资源")
    @RequestMapping(value = "/authResources", method = RequestMethod.POST)
    public ResposeVO authResources(@NotEmpty @RequestBody List<Map<String,Object>> mapList) throws BizException {
        roleService.authorizeResource(mapList);
        return ResponseFactory.ok("操作成功");
    }

    @ApiOperation(value = "查找授权了的资源", notes = "查找授权了的资源")
    @RequestMapping(value = "/findResources", method = RequestMethod.POST)
    public ResposeVO findResourcesByRoleId(@NotNull @RequestBody IdDTO<Long> idDto) throws BizException {
        return ResponseFactory.ok(roleService.findResourceIdsById(idDto.getId()));
    }
}