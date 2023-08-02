

INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Accounting"),
       ("Human Resources"),
       ("Business Integrations");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 90000, 1),
       ("Sales Lead", 80000, 1),
       ("Sales Representative", 45000, 1),
       ("Accounting Manager", 85000, 2),
       ("Accounting Lead", 75000, 2),
       ("Accounting Representative", 40000, 2),
       ("HR Manager", 80000, 3),
       ("HR Lead", 70000, 3),
       ("HR Representative", 35000, 3),
       ("BI Manager", 120000, 4),
       ("Systems Administrator", 100000, 4),
       ("Application Administrator", 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jerry", "Smith", 1, NULL),
       ("Sally", "Sue", 2, 1),
       ("Bob", "Ross", 3, 1),
       ("Evelyn", "Pax", 4, NULL),
       ("Laura", "Jones", 5, 4),
       ("Michael", "Brown", 6, 4),
       ("Richard", "Cleveland", 7, NULL),
       ("Sarah", "Bueller", 8, 7),
       ("John", "Hicks", 9, 7),
       ("Paul", "Richard", 10, NULL),
       ("Bill", "Richardson", 11, 10),
       ("Emma", "Davis", 12, 10);
