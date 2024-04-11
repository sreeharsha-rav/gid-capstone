package app.doconnect.doconnect.answer.dto;

import app.doconnect.doconnect.user.dto.UserResponse;
import lombok.Data;

import java.util.Date;

@Data
public class AnswerResponse {
    private Long id;
    private String answer;
    private Date datePosted;
    private Long questionId;
    private UserResponse user;
}
