package app.doconnect.doconnect.answer.dto;

import lombok.Data;

@Data
public class AnswerRequest {
    private String answer;
    private Long questionId;
    private Long userId;
}
