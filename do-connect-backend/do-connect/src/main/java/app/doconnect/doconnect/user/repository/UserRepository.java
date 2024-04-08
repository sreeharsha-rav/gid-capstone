package app.doconnect.doconnect.user.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import app.doconnect.doconnect.user.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<Object> findFirstByName(String name);

    Optional<Object> findFirstByEmail(String email);
}
