package dao;

import com.google.gson.Gson;
import com.jdrx.platform.commons.rest.utils.JsonMapper;
import com.jdrx.platform.sample.ApplicationStart;
import com.jdrx.platform.sample.beans.entry.ServerInfoPO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ApplicationStart.class)
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
@ComponentScan("com.jdrx")
public class ServerInfoDAO {
    @Autowired
    MongoTemplate mongoTemplate;

    @Test
    public void saveListTest() {
        String string1="{\n" +
                "\t\"_id\": \"192.168.0.8\",\n" +
                "\t\"host\": \"jdrx\",\n" +
                "\t\"cpu\": \"i7\",\n" +
                "\t\"interfaceTotal\": 4,\n" +
                "\t\"memory\": 16,\n" +
                "\t\"disk\": 1000,\n" +
                "\t\"startAt\": \"2018-08-28T01:19:24.214+0000\",\n" +
                "\t\"online\": 1\n" +
                "}";
        String string2="{\n" +
                "\t\"_id\": \"192.168.0.9\",\n" +
                "\t\"host\": \"jdrx\",\n" +
                "\t\"cpu\": \"i7\",\n" +
                "\t\"interfaceTotal\": 4,\n" +
                "\t\"memory\": 16,\n" +
                "\t\"disk\": 1000,\n" +
                "\t\"startAt\": \"2018-08-28T01:19:24.214+0000\",\n" +
                "\t\"online\": 1\n" +
                "}";


        mongoTemplate.save(string1, "serverInfo");
        mongoTemplate.save(string2, "serverInfo");
    }

    @Test
    public void test() throws IOException {
        String string="{\n" +
                "        \"ip\": \"192.168.0.10\",\n" +
                "        \"cpus\": [\n" +
                "          {\n" +
                "            \"name\": \"i7\",\n" +
                "            \"core\": 4,\n" +
                "            \"frequency\": 3.5\n" +
                "          }\n" +
                "        ],\n" +
                "        \"interfaces\": [\n" +
                "          {\n" +
                "            \"ipv4\": \"192.168.0.0\",\n" +
                "            \"ipv6\": \"46465464asd\",\n" +
                "            \"mac\": \"asdasdasd\"\n" +
                "          }\n" +
                "        ],\n" +
                "        \"memory\": 16,\n" +
                "        \"disks\": [\n" +
                "          {\n" +
                "            \"name\": \"wd\",\n" +
                "            \"size\": \"1000G\"\n" +
                "          },\n" +
                "          {\n" +
                "            \"name\": \"wd\",\n" +
                "            \"size\": \"2000 G\"\n" +
                "          }\n" +
                "        ],\n" +
                "        \"startAt\": 1535499418310\n" +
                "      }";


        String string1="{\n" +
                "\t\"ip\": \"192.168.0.223\",\n" +
                "\t\"host\": \"testvm\",\n" +
                "\t\"cpus\": [{\n" +
                "\t\t\"model\": \"Intel(R)Xeon(R)CPUE5-2403v2@1.80GHz\",\n" +
                "\t\t\"core\": \"1\"\n" +
                "\t}],\n" +
                "\t\"interfaces\": [{\n" +
                "\t\t\"ipv4\": \"192.168.0.221\",\n" +
                "\t\t\"ipv6\": \"fe80::c933:4b1e:b6f3:26b0/64\",\n" +
                "\t\t\"mac\": \"66:83:a1:3a:d1:60\"\n" +
                "\t}],\n" +
                "\t\"memory\": \"0.5\",\n" +
                "\t\"disk\": [{\n" +
                "\t\t\"model\": \"disk_total\",\n" +
                "\t\t\"size\": \"10.0\"\n" +
                "\t}],\n" +
                "\t\"startAt\": \"2018-08-29_15:28\"\n" +
                "}";

        JsonMapper mapper = new JsonMapper();
        ServerInfoPO serverInfoPO = mapper.readValue(string1, ServerInfoPO.class);
        mongoTemplate.save(serverInfoPO,"serverInfo");
    }
}
