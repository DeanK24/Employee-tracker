const express = require("express");
const mysql = require("mysql2");
const db = require("./db/connection");
const inquirer = require("inquirer");
const res = require("express/lib/response");
const { init } = require("express/lib/application");
require("console.table");

//initial prompt
function initialPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "question",
      message: "what would you like to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update an Employee Role",
      ],
    })
    .then(function ({ question }) {
      switch (question) {
        case "View Departments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmployees();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update an Employee Role":
          updateEmployeeRole();
          break;
      }
    });
}

// functions for each prompt
viewDepartments = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
};

viewRoles = () => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, function (err, res) {
    if (err) throw err;
    console.table(res);
    initialPrompt();
  });
};

viewEmployees = () => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, function (err, res) {
    if (err) {
      throw err;
    }

    console.table(res);
    initialPrompt();
  });
};

addDepartment = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, function (err, res) {
    if (err) {
      throw err;
    }
    const department = res.map((department) => {
      return {
        name: department.department_name,
        value: department.id,
      };
    });
    console.table(res);
    console.log("Department added");
    promptAddingNewDepartment(department);
  });
};

addRole = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, function (err, res) {
    if (err) {
      throw err;
    }
    const department = res.map((department) => {
      return {
        name: department.department_name,
        value: department.id,
      };
    });
    console.table(res);
    promptAddNewRole(department);
  });
};

addEmployee = () => {
  const sql = `SELECT * FROM roles`;

  db.query(sql, function (err, res) {
    if (err) {
      throw err;
    }
    const roles = res.map(roles => {
      return {
        name: roles.title,
        salary: roles.salary,
        value: roles.id
      }
    });

    console.table(res);
    promptAddNewEmployee(roles);
  });
};

updateEmployeeRole = () => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, function (err, res) {
    if (err) {
      throw err;
    }

    const updateEmployee = res.map(employee => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }
    });

    console.table(res);
    updateRole(updateEmployee)
  });
};

updateRole = (updateEmployee) => {
  const sql = `SELECT * FROM roles`;

  db.query(sql, function (err, res) {
    if (err) {
      throw err;
    }

    const roles = res.map(roles => {
      return {
        name: roles.title,
        value: roles.id,
        salary: roles.salary
      }
    });

    console.table(res);
    promptUpdating(updateEmployee, roles)
  })
}

//prompts for adding new stuff
promptAddingNewDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the new Department name?",
      },
    ])
    .then(function (input) {
      console.table(input);
      const sql = `INSERT INTO department (department_name) VALUES (?)`;

      db.query(sql, [input.department], function (err, res) {
        if (err) {
          throw err;
        }
        console.table(res);
        console.log(`${input.department} added to the database`);
        initialPrompt();
      });
    });
};

promptAddNewRole = (department) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is this new role?",
      },

      {
        type: "input",
        name: "salary",
        message: "What is the salary for this new role?",
      },

      {
        type: "list",
        name: "departmentID",
        message: "What is the department for this new role?",
        choices: department,
      },
    ])
    .then(function (input) {
      console.table(input);

      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;

      db.query(
        sql,
        [input.title, input.salary, input.departmentID],
        function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          initialPrompt();
        }
      );
    });
};

promptAddNewEmployee = (roles) => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the new employee first name?'
      },

      {
        type: 'input',
        name: 'last_name',
        message: 'What is the new employee last name?'
      },

      {
        type: 'list',
        name: 'roleID',
        message: "What is the new employee's role?",
        choices: roles
      },

      {
        type: 'input',
        name: 'managerID',
        message: "What is the new employee's manager ID?"
      },
    ])
    .then(function (input) {
      console.table(input);
      const sql = `INSERT INTO employee (first_name, last_name, role_ID, manager_ID) VALUES (?, ?, ?, ?)`;
      
      db.query(sql, [input.first_name, input.last_name, input.roleID, input.managerID], function (err, res) {
        if (err) {
          throw err;
        }
        console.log(err)
;        console.table(res);

        initialPrompt();
      });
    });
};

promptUpdating = (updateEmployee, roles) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employeeID',
        message: "What employee would you like to update?",
        choices: updateEmployee
      },

      {
        type: 'list',
        name: 'roleID',
        message: "What will the employee's new role be ?",
        choice: roles
      },
    ])
    .then(function (input) {
      console.table(input);

      const sql = `UPDATE employee SET role_ID = ? WHERE id = ?`;

      db.query(sql, [input.employeeID, input.roleID], function (err, res) {
        if (err) {
          throw err;
        }

        console.table(res);

        initialPrompt();
      });
    });
};

initialPrompt();
