package com.jdrx.eams.api;

import com.google.common.collect.Maps;
import com.jdrx.basic.rbac.dao.ExtendDao;
import com.jdrx.basic.rbac.service.UserService;
import com.jdrx.platform.commons.rest.beans.dto.IdDTO;
import com.jdrx.platform.commons.rest.beans.vo.ResposeVO;
import com.jdrx.platform.commons.rest.factory.ResponseFactory;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.NotNull;
import java.util.Map;

/**
 * @description 用户登录接口
 * @author dengfan
 * @version 1.0
 * @date 2018/9/6 0006 13:16
 */
@Api(value = "用户登录控制",description = "用户登录控制")
@CrossOrigin
@RestController
@RequestMapping(value = "/api/user", method = RequestMethod.POST)
public class LoginApi {

    @Autowired
    private UserService userService;
    @Autowired
    private ExtendDao extendDao;

    /**
     * 通过用户名和密码查找用户
     * @param user 用户的信息映射,非空
     *             eg: {name,pwd}
     * @return
     */
    @ApiOperation(value = "用户登录",notes = "用户登录")
    @RequestMapping("/login")
    public ResposeVO login(@NotNull @RequestBody Map<String,Object> user){
        return ResponseFactory.ok(userService.findByNameAndPwd(user));
    }

    /**
     * 根据用户id 获取他所被授权访问的资源
     * @param idDto id传输实体
     *              eg:{id}
     * @return
     */
    @ApiOperation(value = "用户资源",notes = "获取用户资源")
    @RequestMapping("/resources")
    public ResposeVO getResourceByUser(@NotNull @RequestBody IdDTO<Long> idDto){
        Map<String,Object> map = Maps.newHashMap();
        map.put("uid",idDto.getId());
        return ResponseFactory.ok(extendDao.queryList("user.role.resource.list",map));
    }
}