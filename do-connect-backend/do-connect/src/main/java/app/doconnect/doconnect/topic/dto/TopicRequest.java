package app.doconnect.doconnect.topic.dto;

import lombok.Data;

/*
 * This class is used to map the request body of the topic creation request.
 * name - name of the topic
 * description - description of the topic
 */
@Data
public class TopicRequest {
    private String name;
    private String description;
}
