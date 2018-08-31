package com.jdrx.platform.sample.api;


import com.jdrx.basic.rbac.service.DeptService;
import com.jdrx.platform.commons.rest.beans.dto.IdDTO;
import com.jdrx.platform.commons.rest.beans.vo.ResposeVO;
import com.jdrx.platform.commons.rest.exception.BizException;
import com.jdrx.platform.commons.rest.factory.ResponseFactory;
import com.jdrx.platform.sample.beans.dto.PageDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/rbac/dept")
@Api(value = "部门权限")
public class DeptApi {
    @Autowired
    private DeptService deptService;

    @ApiOperation(value = "增加部门", notes = "增加部门")
    @RequestMapping(value = "/find", method = RequestMethod.POST)
    public ResposeVO findAll(@RequestBody PageDTO pageDTO) {

        return ResponseFactory.ok(deptService.list());
    }

    @ApiOperation(value = "查询部门", notes = "查询部门")
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public ResposeVO getResource(@RequestBody IdDTO<Long> idDTO) {
        return ResponseFactory.ok(deptService.findById(idDTO.getId()));
    }


    @ApiOperation(value = "更新部门", notes = "更新部门")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResposeVO updateUser(@RequestBody Map<String,Object> map) {
        deptService.update(map);
        return ResponseFactory.ok("更新成功");
    }

    @ApiOperation(value = "删除部门", notes = "删除部门")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResposeVO deleteUser(@RequestBody IdDTO<Long> idDTO) throws BizException {
        deptService.delete(idDTO.getId());
        return ResponseFactory.ok("删除成功");
    }

    @ApiOperation(value = "添加部门", notes = "添加部门")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResposeVO saveUser(@RequestBody Map<String,Object> map) throws BizException {
        deptService.save(map);
        return ResponseFactory.ok("添加成功");
    }
}
