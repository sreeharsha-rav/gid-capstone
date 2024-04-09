package app.doconnect.doconnect.user.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import app.doconnect.doconnect.user.entity.User;

import java.util.Optional;


/*
 * Repository for User entity
 * findFirstByName - custom method that returns the first user with the given name
 * findFirstByEmail - custom method returns the first user with the given email
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findFirstByName(String name);

    Optional<Object> findFirstByEmail(String email);
}
