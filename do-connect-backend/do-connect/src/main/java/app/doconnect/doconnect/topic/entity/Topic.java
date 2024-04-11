package app.doconnect.doconnect.topic.entity;

import jakarta.persistence.*;
import lombok.Data;

/*
 * Entity class to define the Topic entity
 * id - the ID of the topic
 * name - the name of the topic
 * description - the description of the topic
 */
@Data
@Entity
@Table(name = "topics")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

}
