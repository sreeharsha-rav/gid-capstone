package app.doconnect.doconnect.question.entity;

import app.doconnect.doconnect.topic.entity.Topic;
import app.doconnect.doconnect.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.List;

/*
 * Entity class for Question
 * id - primary key
 * title - title of the question
 * description - description of the question
 * datePosted - date when the question was posted
 * topics - list of topics associated with the question
 * user - the user who posted the question
 */
@Data
@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "body", nullable = false)
    private String body;

    @Column(name = "date_posted", nullable = false)
    private Date datePosted;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "question_topic",
            joinColumns = @JoinColumn(name = "question_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id"))
    private List<Topic> topics;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

}
