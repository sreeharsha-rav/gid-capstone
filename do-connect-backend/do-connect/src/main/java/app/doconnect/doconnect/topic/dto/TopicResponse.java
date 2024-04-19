package app.doconnect.doconnect.topic.dto;

import lombok.Data;

/*
 * This class is used to map the response body of the topic creation response.
 * id - id of the topic
 * name - name of the topic
 * description - description of the topic
 */
@Data
public class TopicResponse {
    private Long id;
    private String name;
    private String description;
}
