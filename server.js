const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

// connection server

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_DB",
});
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  startPrompt();
});

function startPrompt() {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "Select one of the following options to get started:",
      choices: [
        "View Employees",
        "View Department",
        "View Roles",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Remove Department",
        "Remove an Employee",
        "Remove Role",
        "Update Employee Role",
        "Quit",
      ],
    })
    .then((answers) => {
      switch (answers.start) {
        case "View Employees":
          viewEmployees();
          break;
        case "View Department":
          viewDepartment();
          break;
        case "View Roles":
          viewRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRoles();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Remove Department":
          removeDepartment();
          break;
        case "Remove an Employee":
          removeEmployee();
          break;
        case "Remove Role":
          removeRole();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "QUIT":
          quitPrompt();
          break;
      }
    });
}
// view eomployeess
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};
// view department
const viewDepartment = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};
// view roles
const viewRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};
// add employee
const addEmployee = () => {
  connection.query("SELECT * FROM employee", (err, employee) => {
    if (err) throw err;
    connection.query("SELECT * FROM role", (err, roles) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is the employees first name?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is the employees last name?",
          },
          {
            name: "role_id",
            type: "input",
            message: "What is the employees role?",
            choices: () =>
              roles.map((item) => {
                return {
                  name: item.title,
                  value: item.id,
                };
              }),
          },
          {
            type: "list",
            message: "Choose the employees manager",
            name: "manager",
            choices: () =>
              employee.map((item) => {
                return {
                  name: item.first_name,
                  value: item.id,
                };
              }),
          },
        ])
        .then((answers) => {
          console.log(answers);
          connection.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [
              answers.first_name,
              answers.last_name,
              answers.role_id,
              answers.manager,
            ],
            (err) => {
              if (err) throw err;
              startPrompt();
            }
          );
        });
    });
  });
};
// add a department
const addDepartment = () => {
  inquirer
    .prompt({
      name: "addDepartment",
      type: "input",
      message: "What department would you like to add? ",
    })
    .then((answers) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        answers.department,
        (err) => {
          if (err) throw err;
          startPrompt();
        }
      );
    });
};
// add roles
const addRoles = () => {
  inquirer
    .prompt([
      {
        name: "addRole",
        type: "input",
        message: "What roles would you like to add?",
      },
      {
        name: "addSalary",
        type: "input",
        message: "What salary would you like to set for this role?",
      },
      {
        name: "addRoleId",
        type: "input",
        message: "What id would you like to give this department?",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO role (title,salary,department_id) VALUES(?, ?, ?)",
        [answers.addRole, answers.addSalary, answers.addRoleId],
        (err) => {
          if (err) throw err;
          console.log("Your department was succesful created");
          startPrompt();
        }
      );
    });
};
// remove employee
const removeEmployee = () => {
  connection.query("SELECT * FROM employee", (err, employee) => {
    inquirer
      .prompt({
        name: "deleteEmployee",
        type: "list",
        message: "Which employee would you like to remove?",
        choices: employee.map(
          (emp) => `${emp.first_name} ${emp.last_name} ${emp.id}`
        ),
      })
      .then((answers) => {
        let employeeLeft = answer.deleteEmployee.split(" ")[1];
        connection.query(
          `DELETE employee FROM employee WHERE last_name = '${employeeLeft}'`,
          (err) => {
            if (err) throw err;
            startPrompt();
          }
        );
      });
  });
};
// remove department
const removeDepartment = () => {
  connection.query("SELECT * FROM department", (err, department) => {
    inquirer
      .prompt({
        name: "removeDepartment",
        type: "list",
        message: "Which department do you want to remove?",
        choices: department.map((dep) => `${dep.name}`),
      })
      .then((answers) => {
        let departmentLeft = answe.removeDepartment;
        console.log(departmentLeft);
        connection.query(
          `DELETE FROM department WHERE name = '${departmentLeft}'`,
          (err) => {
            if (err) throw err;
            startPrompt();
          }
        );
      });
  });
};
// remove role
const removeRole = () => {
  connection.query("SELECT * FROM role", (err, role) => {
    inquirer
      .prompt({
        name: "removeRole",
        type: "list",
        message: "Which role would you like to remove?",
        choices: role.map((deleteRole) => `${deleteRole.title}`),
      })
      .then((answers) => {
        let roleLeft = answers.deleteRole;
        connection.query(
          `DELETE FROM role WHERE title = '${roleLeft}'`,
          (err) => {
            if (err) throw err;
            startPrompt();
          }
        );
      });
  });
};
// update employee
const updateEmployee = () => {
  connection.query("SELECT * FROM employee", (err, employee) => {
    inquirer
      .prompt({
        name: "updateEmployee",
        type: "list",
        message: "Which employee would you like to update?",
        choices: employee.map(
          (emp) => `${emp.first_name} ${emp.last_name} ${emp.id}`
        ),
      })
      .then((answers) => {
        let empId = answers.updateEmployee.split(" ")[2];
        inquirer
          .prompt({
            name: "role",
            type: "list",
            message: "What is employees new Role?",
            choices: ["Human Resources", "Sales", "Legal", "IT"],
          })
          .then((answers) => {
            let role = answers.selectRole;
            connection.query(
              `SELECT id,title FROM role WHERE title = '${role}'`,
              (err, role) => {
                let roleId = role[1].id;
                connection.query(
                  `UPDATE employee SET sole_id = ${roleId} WHERE id = ${empId}`,
                  (err) => {
                    if (err) throw err;
                    startPrompt();
                  }
                );
              }
            );
          });
      });
  });
};
// exit or end connection
const quitPrompt = () => {
  connection.end();
  process.exit();
};
