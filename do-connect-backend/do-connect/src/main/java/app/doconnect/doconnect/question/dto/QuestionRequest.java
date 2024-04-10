package app.doconnect.doconnect.question.dto;

import lombok.Data;
import java.util.List;

@Data
public class QuestionRequest {
    private String title;
    private String body;
    private List<String> topics;
    private Long userId;
}
