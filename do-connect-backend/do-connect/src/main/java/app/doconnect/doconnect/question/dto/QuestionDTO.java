package app.doconnect.doconnect.question.dto;

import lombok.Data;

import java.util.List;

/*
 * QuestionDTO as a data transfer object for Question entity
 * id - ID of the question
 * title - Title of the question
 * body - Body of the question
 * topics - List of topics associated with the question
 * userId - ID of the user who posted the question
 */
@Data
public class QuestionDTO {
    private Long id;
    private String title;
    private String body;
    private List<String> topics;
    private Long userId;
}
