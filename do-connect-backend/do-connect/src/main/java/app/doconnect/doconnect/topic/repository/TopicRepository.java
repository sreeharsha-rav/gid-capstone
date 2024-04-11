package app.doconnect.doconnect.topic.repository;

import app.doconnect.doconnect.topic.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/*
 * Repository for Topic entity to perform CRUD operations
 * findByName - to find topic by name
 */
@Repository
public interface TopicRepository extends JpaRepository<Topic, Long>{

    Optional<Topic> findByName(String name);


}
