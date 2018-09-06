package com.jdrx.eams.api;


import com.jdrx.basic.rbac.service.DeptService;
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
import java.util.Map;

/**
 * @author xzx
 * @version 1.1
 * @updater dnf
 * @updateDate 18/9/5
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/api/rbac/dept")
@Api(value = "部门权限")
public class DeptApi {
    @Autowired
    private DeptService deptService;

    /**
     * 查找所有部门
     * @param map 分页,无用
     * @return
     */
    @ApiOperation(value = "查找所有部门", notes = "查找所有部门")
    @RequestMapping(value = "/find", method = RequestMethod.POST)
    public ResposeVO findAll(@RequestBody Map<String,Object> map) {

        return ResponseFactory.ok(deptService.list(map));
    }

    /**
     * 通过id 查找一个部门
     * @param idDTO 非null
     * @return
     */
    @ApiOperation(value = "查询部门", notes = "查询部门")
    @RequestMapping(value = "/get", method = RequestMethod.POST)
    public ResposeVO get( @NotNull @RequestBody IdDTO<Long> idDTO) {
        return ResponseFactory.ok(deptService.findById(idDTO.getId()));
    }

    /**
     * 更新部门信息
     * @param map 部门基本信息映射
     *            eg: {id,name,pid}
     * @return
     */
    @ApiOperation(value = "更新部门", notes = "更新部门")
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResposeVO update(@RequestBody Map<String,Object> map) {
        deptService.update(map);
        return ResponseFactory.ok("更新成功");
    }

    /**
     * 根据 id 删除部门
     * @param idDTO 非null
     * @return
     */
    @ApiOperation(value = "删除部门", notes = "删除部门")
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResposeVO delete( @NotNull @RequestBody IdDTO<Long> idDTO) {
        deptService.deleteById(idDTO.getId());
        return ResponseFactory.ok("删除成功");
    }

    /**
     * 添加一个部门
     * @param map 部门信息映射
     *            eg:{name,pid}
     * @return
     */
    @ApiOperation(value = "添加部门", notes = "添加部门")
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResposeVO save(@RequestBody Map<String,Object> map){
        deptService.save(map);
        return ResponseFactory.ok("添加成功");
    }
}
