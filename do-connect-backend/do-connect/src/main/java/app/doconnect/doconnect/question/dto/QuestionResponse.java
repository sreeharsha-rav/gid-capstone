package app.doconnect.doconnect.question.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class QuestionResponse {
    private Long id;
    private String title;
    private String body;
    private Date datePosted;
    private List<String> topics;
    private Long userId;
}
