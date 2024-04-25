package app.doconnect.doconnect.question.dto;

import lombok.Data;
import java.util.List;

/*
 * DTO class to define the request object for a Question
 * title - the title of the question
 * body - the body of the question
 * topics - the topics associated with the question
 * userId - the ID of the user who posted the question
 */
@Data
public class QuestionRequest {
    private String title;
    private String body;
    private List<String> topics;
    private Long userId;
}
