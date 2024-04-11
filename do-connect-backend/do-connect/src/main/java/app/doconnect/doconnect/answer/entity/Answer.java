package app.doconnect.doconnect.answer.entity;

import app.doconnect.doconnect.question.entity.Question;
import app.doconnect.doconnect.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "answers")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "answer", nullable = false)
    private String answer;

    @Column(name = "date_posted", nullable = false)
    private Date datePosted;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
