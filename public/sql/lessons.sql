
CREATE TABLE contact (
  contact_id int(11) NOT NULL AUTO_INCREMENT,
  f_name varchar(100) NOT NULL,
  l_name varchar(100) NOT NULL,
  email varchar(140) NOT NULL,
  need varchar(200) NOT NULL,
  message text NOT NULL,
  created_at timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (contact_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE need(
  need_id int(11) NOT NULL AUTO_INCREMENT,
  need varchar(200) NOT NULL,
  PRIMARY KEY (need_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO need (need) VALUES ('Request lessons'),('Give feedback');

INSERT INTO need (need_id, need) VALUES (10,'Other');


CREATE TABLE if not exists grade (
  grade_id int(11) NOT NULL AUTO_INCREMENT,
  grade varchar(50) NOT NULL,
  PRIMARY KEY (grade_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO grade (grade) VALUES ('Grade 1'), ('Grade 2'),
('Grade 3') ,('Grade 4'), ('Grade 5'), ('Grade 6'), ('Grade 7'),
 ('Grade 8'), ('Grade 9'), ('Grade 10'), ('Grade 11'), ('Grade 12');

CREATE TABLE if not exists subject(
  subject_id int(11) NOT NULL AUTO_INCREMENT,
  subject varchar(100) NOT NULL,
  PRIMARY KEY (subject_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO subject (subject) VALUES ('English'),('Mathematics'),
('Science'),('Social Studies'),('Physics'),
('Chemistry'),('Biology'),('History'),
('Geography');


 CREATE TABLE if not exists lesson (
   lesson_id int(11) NOT NULL AUTO_INCREMENT,
   lesson_title varchar(500) NOT NULL,
   grade_id int(11) NOT NULL,
   chapter int(11),
   subject_id int(11) NOT NULL,
   link varchar(400) NOT NULL,
   description varchar(1000),
   PRIMARY KEY (lesson_id),
   CONSTRAINT fk_grade FOREIGN KEY (grade_id)
  REFERENCES grade(grade_id) ,
  CONSTRAINT fk_subject FOREIGN KEY (subject_id)
  REFERENCES subject(subject_id)
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


 INSERT INTO `lessons`.`lesson`
(
`lesson_title`,
`grade_id`,
`chapter`,
`subject_id`,
`link`,
`description`)
VALUES
(
"Cellular Transport",
9,
5,
7,
"https://youtu.be/F4aB4p-wo_Y",
"An introduction to cellular transport and will cover both active and passive transport. Also, compare the differences between both methods and review the plasma membrane.");
