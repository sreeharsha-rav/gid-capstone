DROP DATABASE IF EXISTS doconnect;
CREATE DATABASE doconnect;
USE doconnect;
SHOW tables;

-- Users for DoConnect
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

SELECT * FROM users;

-- Topics
CREATE TABLE topics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT
);

INSERT INTO topics (name, description)
VALUES
    ('java', 'Java programming language'),
    ('method references', 'Syntax and usage of method references in Java'),
    ('syntax', 'Syntax rules and conventions in programming languages'),
    ('exception handling', 'Techniques for handling exceptions in software development'),
    ('best practices', 'Recommended practices for writing clean and efficient code'),
    ('spring boot', 'Framework for building Java-based enterprise applications'),
    ('security', 'Principles and practices for securing software applications'),
    ('authentication', 'Process of verifying the identity of a user or system'),
    ('sql', 'Structured Query Language used for managing relational databases'),
    ('database', 'Structured collection of data organized for efficient retrieval'),
    ('performance optimization', 'Techniques for improving the performance of software applications'),
    ('java 17', 'Features and enhancements introduced in Java version 17'),
    ('new features', 'New functionalities introduced in software releases'),
    ('deployment', 'Process of making software applications available for use'),
    ('production', 'Environment where software applications are deployed and used by end-users');

SELECT * FROM topics;

-- Questions
CREATE TABLE questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    date_posted TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO questions (title, body, date_posted, user_id)
VALUES 
    ("How to implement method references in Java?", "I want to know how to use method references in Java programming.", NOW(), 1),
    ("What are the best practices for exception handling?", "I'm looking for recommendations on handling exceptions in Java.", NOW(), 2),
    ("How to secure a Spring Boot application?", "What are the security measures to implement in a Spring Boot project?", NOW(), 1),
    ("What is SQL injection?", "Explain the concept of SQL injection and how to prevent it in web applications.", NOW(), 2);

SELECT * FROM questions;

-- Question Topic
CREATE TABLE question_topic (
    question_id BIGINT,
    topic_id BIGINT,
    FOREIGN KEY (question_id) REFERENCES questions (id),
    FOREIGN KEY (topic_id) REFERENCES topics (id)
);

INSERT INTO question_topic (question_id, topic_id) VALUES
    (1, 3), -- Method references
    (1, 6), -- Best practices
    (1, 2), -- Java

    (2, 5), -- Exception handling
    (2, 6), -- Best practices
    (2, 2), -- Java

    (3, 7), -- Spring Boot
    (3, 8), -- Security

    (4, 10), -- SQL
    (4, 8); -- Security
    
SELECT * FROM question_topic;

-- Answer
CREATE TABLE answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    answer TEXT NOT NULL,
    date_posted TIMESTAMP NOT NULL,
    question_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO answers (answer, date_posted, question_id, user_id)
VALUES 
    ("Method references provide a compact way to refer to methods without executing them directly. They are often used to pass behavior as arguments to other methods, such as in streams or lambda expressions.", NOW(), 1, 1),
    ("Method references are a feature of Java that allow you to refer to methods or constructors of classes or objects. They provide a way to pass behavior around as if it were a value.", NOW(), 1, 2),
    ("Exception handling in Java involves using try-catch blocks to handle exceptions that may occur during program execution. It's important to handle exceptions gracefully to prevent unexpected behavior and crashes in your application.", NOW(), 2, 1),
    ("Best practices for exception handling in Java include properly identifying the types of exceptions that can occur, handling exceptions at the appropriate level of abstraction, and providing meaningful error messages to users.", NOW(), 2, 2),
    ("Securing a Spring Boot application involves implementing various security measures such as authentication, authorization, encryption, and input validation to protect against common security threats like SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).", NOW(), 3, 1),
    ("Security is a critical aspect of software development, especially in web applications. Spring Boot provides robust support for implementing security features such as authentication, authorization, and encryption to safeguard sensitive data and prevent unauthorized access.", NOW(), 3, 2),
    ("SQL injection is a type of attack where malicious SQL statements are inserted into input fields of a web application, allowing attackers to manipulate the database or execute arbitrary SQL commands. Preventing SQL injection requires using parameterized queries, input validation, and escaping user input.", NOW(), 4, 1),
    ("To prevent SQL injection attacks, always use parameterized queries or prepared statements instead of concatenating user input directly into SQL statements. Additionally, validate and sanitize user input to ensure it does not contain any malicious content.", NOW(), 4, 2);

SELECT * FROM answers;