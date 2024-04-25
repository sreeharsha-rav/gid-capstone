package app.doconnect.doconnect.question.dto;

import app.doconnect.doconnect.user.dto.UserResponse;
import lombok.Data;

import java.util.Date;
import java.util.List;

/*
 * DTO class to define the response object for a Question
 * id - the unique identifier for the question
 * title - the title of the question
 * body - the body of the question
 * datePosted - the date the question was posted
 * topics - the topics associated with the question
 * user - the user who posted the question
 */
@Data
public class QuestionResponse {
    private Long id;
    private String title;
    private String body;
    private Date datePosted;
    private List<String> topics;
    private UserResponse user;
}
