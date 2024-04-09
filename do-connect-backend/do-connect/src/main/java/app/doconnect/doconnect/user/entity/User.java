package app.doconnect.doconnect.user.entity;

import jakarta.persistence.*;
import lombok.Data;


/*
 * Entity class for User
 * id - primary key
 * name - name of the user
 * email - email of the user
 * password - password of the user
 */
@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

}
