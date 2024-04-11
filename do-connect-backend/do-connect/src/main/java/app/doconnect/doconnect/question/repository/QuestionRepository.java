package app.doconnect.doconnect.question.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import app.doconnect.doconnect.question.entity.Question;

import java.util.List;

/*
 * Repository for Question entity
 * findByTopics_Id method is used to get all questions by topicId
 */
@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {

        List<Question> findByTopics_Id(Long topicId);
}