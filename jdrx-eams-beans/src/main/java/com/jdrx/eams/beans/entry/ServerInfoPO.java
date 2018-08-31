package com.jdrx.eams.beans.entry;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

/*
 * created by xiongzhixin 2018/8/28
 * */
public class ServerInfoPO {
    //ip
    @Id
    private String ip;
    //主机名称
    private String host;
    //cpu型号
    private List<CpuPO> cpus;
    //网卡端口数量
    private List<InterfacePO> interfaces;
    //内存大小
    private Double memory;
    //硬盘大小
    private List<DiskPO> disks;
    //上次的开机时间
    @JsonFormat(pattern="yyyy-MM-dd_hh:mm")
    private Date startAt;

    @Override
    public String toString() {
        return "ServerInfoPO{" +
                "ip='" + ip + '\'' +
                ", host='" + host + '\'' +
                ", cpus=" + cpus +
                ", interfaces=" + interfaces +
                ", memory=" + memory +
                ", disks=" + disks +
                ", startAt=" + startAt +
                '}';
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
