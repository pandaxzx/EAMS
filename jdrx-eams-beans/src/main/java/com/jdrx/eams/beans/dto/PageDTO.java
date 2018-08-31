package com.jdrx.eams.beans.dto;

import com.jdrx.platform.commons.rest.beans.dto.PageBaseDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;


/*
* created by xiongzhixin 2018/8/28
* */
@ApiModel
public class PageDTO extends PageBaseDTO {
    //默认的每页显示条目
    static int PAGE_SIZE=5;
    //显示条目
    @ApiModelProperty(value = "显示条目",notes = "显示条目")
    private Integer pageSize;

    public PageDTO() {
    }

    public PageDTO(Integer pageNum, Integer pageSize) {
        this.pageSize = pageSize==null?PAGE_SIZE:pageSize;
        super.setPageNum(pageNum);
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
