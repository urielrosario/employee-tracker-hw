USE employees_DB;

INSERT INTO department (name)
VALUES ('Human Resources');

INSERT INTO department (name)
VALUE('Sales');

INSERT INTO department (name)
VALUES ('Legal');

INSERT INTO department (name)
VALUES ('IT');

INSERT INTO role (title, salary, department_id)
VALUES('Sales Lead', 50000,2);

INSERT INTO role (title, salary, department_id)
VALUES('Sales Man' ,40000,2);

INSERT INTO role (title, salary, department_id)
VALUES('Lead Engineer', 150000, 4);

INSERT INTO role (title, salary, department_id)
VALUES('Software Engineer', 100000,4);

INSERT INTO role (title, salary, department_id)
VALUES('Account Manager', 70000,1);

INSERT INTO role (title, salary, department_id)
VALUES('Legal Lead', 80000,3);

INSERT INTO role (title, salary, department_id)
VALUES('Lawyer', 100000,3);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES('Bob', 'Smith',1, NULL);

INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES('Michael','Myers',2,1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES('Sponge', 'Bob',3,NULL);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES('Tony', "Montana",4,3);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES('Tom', 'Jerry',5, NULL);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES('Peter', 'Parker',6,NULL);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES('Albert', 'Einstein',7,6);


