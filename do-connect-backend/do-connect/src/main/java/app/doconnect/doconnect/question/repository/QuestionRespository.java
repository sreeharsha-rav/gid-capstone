package app.doconnect.doconnect.question.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import app.doconnect.doconnect.question.entity.Question;

/*
 * Repository for Question entity
 */
@Repository
public interface QuestionRespository extends JpaRepository<Question, Long> {
}