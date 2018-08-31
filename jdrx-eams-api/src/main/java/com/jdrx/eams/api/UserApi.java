package com.jdrx.eams.api;

import com.jdrx.basic.rbac.service.UserService;
import com.jdrx.platform.commons.rest.beans.dto.IdDTO;
import com.jdrx.platform.commons.rest.beans.vo.ResposeVO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.commons.rest.factory.ResponseFactory;
import com.jdrx.eams.beans.dto.PageDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin
@RestController
@RequestMapping(value = "/api/rbac/user")
@Api(value = "用户权限")
public class UserApi {
    @Autowired
    private UserService userService;

    @ApiOperation(value = "增加用户", notes = "增加用户")
    @RequestMapping(value = "/find", method = RequestMethod.POST)
    public ResposeVO findAll(@RequestBody PageDTO pageDTO) {
        return ResponseFactory.ok(userService.list());
    }

    @ApiOperation(value = "查询单个用户", notes = "查询单个用户")
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public ResposeVO getUser(@RequestBody IdDTO<Long> idDTO) {
        return ResponseFactory.ok(userService.findById(idDTO.getId()));
    }

    @ApiOperation(value = "更新单个用户", notes = "更新单个用户")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResposeVO updateUser(@RequestBody Map<String,Object> map) {
        userService.update(map);
        return ResponseFactory.ok("更新成功");
    }

    @ApiOperation(value = "删除用户", notes = "删除用户")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResposeVO deleteUser(@RequestBody IdDTO<Long> idDTO) throws BizException {
        userService.delete(idDTO.getId());
        return ResponseFactory.ok("删除成功");
    }

    @ApiOperation(value = "添加用户", notes = "添加用户")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResposeVO saveUser(@RequestBody Map<String,Object> map) throws BizException {
        userService.save(map);
        return ResponseFactory.ok("添加成功");
    }


}
