insert into registration (uuid, registrationname, registrationprice, createdAt, updatedAt) values ("uuid", "Registration Fee", 15000, "2022-10-20 20:17:04", "2022-10-20 20:17:04");

CREATE TABLE courses_seq
(
  coursesid INT NOT NULL auto_increment primary key
);

DELIMITER $$
CREATE TRIGGER tg_courses_insert
BEFORE INSERT ON courses
FOR EACH ROW
BEGIN
  INSERT INTO courses_seq VALUES (NULL);
  SET NEW.coursecode = CONCAT('EVLI-', LPAD(LAST_INSERT_ID(), 2, '0'));
END$$
DELIMITER ;


CREATE TABLE students_seq
(
  studentid INT NOT NULL auto_increment primary key
);

DELIMITER $$
CREATE TRIGGER tg_students_insert
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
  INSERT INTO students_seq VALUES (NULL);
  SET NEW.studentid = CONCAT('EVLI-', LPAD(LAST_INSERT_ID(), 5, '0'));
END$$
DELIMITER ;


