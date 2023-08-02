const db = require('./connection');

class DBQuery {
  constructor(db){
    this.db = db;
  }


// add a department 
  addDept(data) {
    const values = [data.name];
    return this.db
      .promise()
      .query(
        `INSERT INTO department (department_name) VALUES(?)`,
        values
        );
  }

//   query to add a role 
  addRole(data) {
    const values = [data.title, data.salary, data.department_id];
    return this.db
      .promise()
      .query(
        `INSERT INTO role 
        (title, salary, department_id) 
        VALUES(?,?,?)`,
        values
        );
  }

// add a new employee
  addEmp(data) {
    const values = [data.first, data.last, data.role_id, data.manager_id];
    return this.db
      .promise()
      .query(
        `INSERT INTO employee
        (first_name, last_name, role_id, manager_id)
        VALUES(?,?,?,?)`,
        values
      )
  }


//   delete an employee
  deleteEmp(data) {
    const values = [data.emp_id];
    return this.db
      .promise()
      .query(
        `DELETE FROM employee
        WHERE id = ?`,
        values
      )
  }


//   update an employee by their ID
  updateEmpRoleById(data) {
    const values = [data.role_id, data.emp_id];
    return this.db
      .promise()
      .query(
        `UPDATE employee
         SET role_id = ?
         WHERE id = ?`,
        values
      )
  }


//   update a manager by ID
  updateEmpManagerById(data) {
    const values = [data.manager_id, data.emp_id];
    return this.db
      .promise()
      .query(
        `UPDATE employee
         SET manager_id = ?
         WHERE id = ?`,
        values
      );
  }


//   get all departments in the DB
  getDepts() {
    return this.db
      .promise()
      .query(
    `SELECT * 
    FROM department`
    );
  }

//   get department by ID
  getEmpByDeptId(data) {
    const values = [data.dept_id]
    return this.db
      .promise()
      .query(
        `SELECT e.first_name AS "First Name" , 
                e.last_name AS "Last Name", 
                d.department_name AS Department
        FROM employee e
        INNER JOIN role r
        ON e.role_id = r.id
        INNER JOIN department d
        ON r.department_id = d.id
        WHERE d.id = ?`,
        values
      );
  }

//   get an employee by their manager's ID
  getEmpByMgrId(data) {
    const values = [data.manager_id]
    return this.db
      .promise()
      .query(
        `SELECT e.first_name AS "First Name" , 
                e.last_name AS "Last Name", 
                CONCAT(mgmt.first_name, ' ', mgmt.last_name) AS Manager
        FROM employee e
        INNER JOIN employee mgmt
        ON e.manager_id = mgmt.id 
        WHERE e.manager_id = ?`,
        values
      );
  }


//   get a budget by department 
  getBudgetByDept() {
    return this.db
      .promise()
      .query(
    `SELECT d.department_name AS Department, 
            SUM(r.salary) AS Budget
    FROM role r
    INNER JOIN department d
    ON r.department_id = d.id
    GROUP BY department_name`,
    );
  }


//   get all roles 
  getRoles() {
    return this.db
      .promise()
      .query(
      `SELECT r.title AS Title, 
      r.salary AS Salary, 
      d.department_name AS Department
      FROM role r
      LEFT JOIN department d
      ON r.department_id = d.id
      ORDER BY Department, r.id ASC`
      );
  }
// get all role ID's
  getRoleIds(){
    return this.db
      .promise()
      .query(
      `SELECT *
      FROM role`
      );
  }

//   get all employees
  getEmps() {
    return this.db
      .promise()
      .query(
      `SELECT e.id as 'Employee_ID', 
              e.first_name AS 'First_Name',
              e.last_name AS 'Last_Name',
              department.department_name AS Department,
              role.salary AS Salary,
              role.title AS Role,
              CONCAT(mgmt.first_name,' ',mgmt.last_name) as Manager
      FROM employee e
      LEFT JOIN employee mgmt
      ON e.manager_id = mgmt.id 
      INNER JOIN role
      ON e.role_id = role.id 
      LEFT JOIN department 
      ON role.department_id = department.id
      ORDER BY e.id;`
      );
  }

  getEmpRaw() {
    return this.db
      .promise()
      .query(
        `SELECT e.id, 
         e.first_name,
         e.last_name
         FROM employee e`
        )
  }
// get employees that aren't managers
  getNonManagers(){
    return this.db
    .promise()
    .query(
    `SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name
    FROM employee 
    WHERE manager_id IS NOT NULL`
  )
  }


//   get managers 
  getManagers() {
    return this.db
      .promise()
      .query(
      `SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name
      FROM employee 
      WHERE manager_id IS NULL`
    )
  }

}

module.exports = new DBQuery(db);