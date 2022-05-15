INSERT INTO department (department_name, id)
VALUES
('Sales', 1),
('IT', 2),
('Engineering', 3),
('Finance', 4),
('Legal', 5);

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, 'Salesperson', 70000, 1),
(2, 'Software engineer', 80000, 2),
(3, 'Lead engineer', 75000, 3),
(4, 'Accountant', 65000, 4),
(5, 'Legal team lead', 95000, 5),
(6, 'Sales lead', 75000, 1),
(7, 'Account manager', 105000, 4),
(8, 'Lawyer', 85000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'James', 'Fraser', 5, NULL),
(2, 'Jack', 'London', 3, NULL),
(3, 'Robert', 'Bruce', 7, NULL),
(4, 'Peter', 'Greenway', 8, NULL),
(5, 'Derek', 'Jarman', 1, 1),
(6, 'Paolo', 'Pasolini', 2, 2),
(7, 'Heathcote', 'Williams', 3, 3),
(8, 'Sandy', 'Powell', 4, 4);
