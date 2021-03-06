package com.jdrx.eams.beans.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jdrx.eams.beans.entry.CpuPO;
import com.jdrx.eams.beans.entry.DiskPO;
import com.jdrx.eams.beans.entry.InterfacePO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;
/*
 * created by xiongzhixin 2018/8/28
 * */

@ApiModel
public class ServerInfoDTO extends PageDTO {
    @Id
    @ApiModelProperty(value = "ip地址",notes = "ip地址")
    private String ip;

    @ApiModelProperty(value = "所属环境",notes = "所属环境")
    private List<Integer> envs;

    @ApiModelProperty(value = "运行的app",notes = "运行的app")
    private List<Integer> apps;

    @ApiModelProperty(value = "主机名",notes = "主机名")
    private String host;

    @ApiModelProperty(value = "cpu",notes = "cpu")
    private List<CpuPO> cpus;

    @ApiModelProperty(value = "网卡",notes = "网卡")
    private List<InterfacePO> interfaces;

    @ApiModelProperty(value = "内存",notes = "内存")
    private Double memory;

    @ApiModelProperty(value = "硬盘",notes = "硬盘")
    private List<DiskPO> disks;

    @ApiModelProperty(value = "上次开机时间",notes = "上次开机时间")
    @JsonFormat(pattern="yyyy-MM-dd_hh:mm")
    private Date startAt;


    public List<Integer> getEnvs() {
        return envs;
    }

    public void setEnvs(List<Integer> envs) {
        this.envs = envs;
    }

    public List<Integer> getApps() {
        return apps;
    }

    public void setApps(List<Integer> apps) {
        this.apps = apps;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public List<CpuPO> getCpus() {
        return cpus;
    }

    public void setCpus(List<CpuPO> cpus) {
        this.cpus = cpus;
    }

    public List<InterfacePO> getInterfaces() {
        return interfaces;
    }

    public void setInterfaces(List<InterfacePO> interfaces) {
        this.interfaces = interfaces;
    }

    public Double getMemory() {
        return memory;
    }

    public void setMemory(Double memory) {
        this.memory = memory;
    }

    public List<DiskPO> getDisks() {
        return disks;
    }

    public void setDisks(List<DiskPO> disks) {
        this.disks = disks;
    }

    public Date getStartAt() {
        return startAt;
    }

    public void setStartAt(Date startAt) {
        this.startAt = startAt;
    }
}
