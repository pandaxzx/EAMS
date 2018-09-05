package com.jdrx.eams.api;

import com.jdrx.basic.rbac.service.UserService;
import com.jdrx.platform.commons.rest.beans.dto.IdDTO;
import com.jdrx.platform.commons.rest.beans.vo.ResposeVO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.commons.rest.factory.ResponseFactory;
import com.jdrx.eams.beans.dto.PageDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;


@CrossOrigin
@RestController
@RequestMapping(value = "/api/rbac/user")
@Api(value = "用户权限")
public class UserApi {
    @Autowired
    private UserService userService;

    @ApiOperation(value = "用户登陆", notes = "用户登陆")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResposeVO login(@RequestBody Map<String, Object> user) {
        return ResponseFactory.ok(userService.findByNameAndPwd(user));
    }


    @ApiOperation(value = "增加用户", notes = "增加用户")
    @RequestMapping(value = "/find", method = RequestMethod.POST)
    public ResposeVO findAll(@RequestBody Map<String, Object> user) {
        return ResponseFactory.ok(userService.list(user));
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
        userService.deleteById(idDTO.getId());
        return ResponseFactory.ok("删除成功");
    }

    @ApiOperation(value = "添加用户", notes = "添加用户")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResposeVO saveUser(@RequestBody Map<String,Object> map) throws BizException {
        userService.save(map);
        return ResponseFactory.ok("添加成功");
    }

    /**
     * 授权角色给用户
     * @param mapList 用户和角色的关系映射列表
     *          eg: [{
     *                  user_id: 1,
     *                  role_id: 1
     *               }]
     * @return
     */
    @ApiOperation(value = "授权角色",notes = "授权角色给用户")
    @RequestMapping(value = "/authRoles", method = RequestMethod.POST)
    public ResposeVO authorizeRole(@NotEmpty @Valid @RequestBody List<Map<String,Object>> mapList){
        userService.authorizeRole(mapList);
        return ResponseFactory.ok("操作成功");
    }

    /**
     * 通过ID查找用户的所有角色
     * @param idDto
     * @return
     */
    @ApiOperation(value = "查找用户的角色", notes = "查找用户的所有角色")
    @RequestMapping(value = "/findRoles", method = RequestMethod.POST)
    public ResposeVO findAuthedRoles(@NotNull @Valid @RequestBody IdDTO<Long> idDto){
        return ResponseFactory.ok(userService.findRoleIdsById(idDto.getId()));
    }
}