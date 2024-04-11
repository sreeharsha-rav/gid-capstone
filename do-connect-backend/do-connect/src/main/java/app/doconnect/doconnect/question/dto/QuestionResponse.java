package app.doconnect.doconnect.question.dto;

import app.doconnect.doconnect.user.dto.UserResponse;
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
    private UserResponse user;
}
