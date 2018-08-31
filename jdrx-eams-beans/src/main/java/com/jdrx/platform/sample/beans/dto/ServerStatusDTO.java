package com.jdrx.platform.sample.beans.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel
public class ServerStatusDTO {
    @ApiModelProperty(value = "cpu使用率",notes = "cpu使用率")
    private Double cpu;

    @ApiModelProperty(value = "已使用内存",notes = "已使用内存")
    private Double memory;

    @ApiModelProperty(value = "已使用硬盘",notes = "已使用硬盘")
    private Double disk;

    @ApiModelProperty(value = "进程数",notes = "进程数")
    private Integer processes;

    public Double getCpu() {
        return cpu;
    }

    public void setCpu(Double cpu) {
        this.cpu = cpu;
    }

    public Double getMemory() {
        return memory;
    }

    public void setMemory(Double memory) {
        this.memory = memory;
    }

    public Double getDisk() {
        return disk;
    }

    public void setDisk(Double disk) {
        this.disk = disk;
    }


    public Integer getProcesses() {
        return processes;
    }

    public void setProcesses(Integer processes) {
        this.processes = processes;
    }
}
