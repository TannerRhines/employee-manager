(async () => {
    const { default: inquirer } = await import('inquirer');
    const cTable = require('console.table');
    const sql = require('./db/query_lib');
    const cHelper = require('./lib/choiceHelper');



// adds an department to the DB and validates name with an if statement
const newDept = async () => {  

  const deptartment = await inquirer.prompt([
     {
       type: "input",
       name: "name",
       message: "What is the name of the Department",
       validate: (name) =>{
         if (name) {
           return true;
         } else {
           console.log(" Please Enter a Department Name!")
           return false;
         }
       },
    },
  ]);

  await sql.addDept(deptartment);

  chooseRequest();
}

// adds an employee to the DB and validates name with an if statement
const newEmp = async () => {

  const roleArr = await cHelper.roleChoices();

  const mgmtArr = await cHelper.mgmtChoices();

  const emp = await inquirer.prompt([
      {
        type: "input",
        name: "first",
        message: "What is the Employees First Name?",
        validate: (first) =>{
          if (first && isNaN(first)) {
            return true;
          } else {
            console.log(" Please Enter a Name!")
            return false;
          }
        },
     },
     {
      type: "input",
      name: "last",
      message: "What is the Employees Last Name?",
      validate: (last) =>{
        if (last && isNaN(last)) {
          return true;
        } else {
          console.log(" Please Enter a Name!")
          return false;
        }
      },
    },
    {
      type: "list",
      name: 'role_id',
      message: "What is the Employees Role?",
      choices: roleArr,
      loop: false,
    },
    {
      type: "list",
      name: 'manager_id',
      message: "Who is the Employees Manager?",
      choices: mgmtArr,
      loop: false,
    }
   ]);

  await sql.addEmp(emp);

  chooseRequest();  
 
}

// Adds a new role w/ salary to the DB and validates name with an if statement if salary is not a number and name is empty
const newRole = async () => {

  const choicesArr = await cHelper.deptChoices();

  const role = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the Role?",
        validate: (title) =>{
          if (title) {
            return true;
          } else {
            console.log(" Please Enter a Role Name!")
            return false;
          }
        },
     },
     {
       type: "input",
       name: 'salary',
       message: "What is the Salary of the Role?",
       validate: (salary) =>{
         if(salary && !isNaN(salary)){
           return true;
         } else {
           console.log(" Please Enter a Role Salary");
         }
       }
     },
     {
      type: "list",
      name: 'department_id',
      message: "What Department is the Role associated with?",
      choices: choicesArr,
      loop: false,
    }
   ]);

  await sql.addRole(role);

  chooseRequest();  
 
}

// Delete an Employee from the DB with choices from employee array
// Bonus Objective
const delEmp = async () => {
  const empArr = await cHelper.NonMgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What Employee do you want to Delete?",
      choices: empArr,
      loop: false,
    }
   ]);

  await sql.deleteEmp(emp);

  chooseRequest();

}

// Update an employees role in the database with choices from employee array
const updateEmpRole = async () => {

  const roleArr = await cHelper.roleChoices();

  const empArr = await cHelper.empChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What is the Employee do you want to update?",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: 'role_id',
      message: "What is the Employees Role?",
      choices: roleArr,
      loop: false,
    }
   ]);

  await sql.updateEmpRoleById(emp);

  chooseRequest();  
 
}

// Update an employees Manager from the DB employee array and assign them a new manager 
// Bonus Objective
const updateEmpManager = async () => {

  const empArr = await cHelper.NonMgmtChoices();

  const mgmtArr = await cHelper.mgmtChoices();

  const emp = await inquirer.prompt([
    {
      type: "list",
      name: "emp_id",
      message: "What is the Employee do you want to update?",
      choices: empArr,
      loop: false,
    },
    {
      type: "list",
      name: 'manager_id',
      message: "Who is the Employees Manager?",
      choices: mgmtArr,
      loop: false,
    }
   ]);

  await sql.updateEmpManagerById(emp);

  chooseRequest();  
 
}

// View All Departments in the DB, get department table rows 
const viewDepts = () => {
  sql.getDepts()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// View All Roles in the DB, get roles table rows
const viewRoles = () => {
  sql.getRoles()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}
// View All employees in the DB
const viewEmps = () => {
  sql.getEmps()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// View All Departments and their Budgets from the DB
// Bonus Objective
const viewBudgets = async () => {

  sql.getBudgetByDept()

  .then(([rows]) => {
    console.log('\n');
    console.log(cTable.getTable(rows));
  })

  .then(()=> {
      chooseRequest();
  }) 
}

// This views all Employees based on a specific Department in the DB
// Bonus Objective
const viewEmpByDept = async () => {

  const deptArr = await cHelper.deptChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "dept_id",
      message: "What is the Department do you want to view Employees for?",
      choices: deptArr,
      loop: false
    }
   ])

  .then((data) => {
    sql.getEmpByDeptId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(cTable.getTable(rows))
        chooseRequest();
      })
  }) 

}

// View All Employees who have a specific Manager
// Bonus Objective
const viewEmpByMgr = async () => {

  const mgmtArr = await cHelper.mgmtChoices();

  inquirer.prompt([
    {
      type: "list",
      name: "manager_id",
      message: "Which Manager do you want to view Employees for?",
      choices: mgmtArr,
      loop: false
    }
   ])

  .then((data) => {
    sql.getEmpByMgrId(data)
      .then(([rows]) =>{
        console.log('\n');
        console.log(cTable.getTable(rows))
        chooseRequest();
      })
  }) 

}

// this is the initial inquirer prompt when running node server.js

const chooseRequest = () => {
  inquirer.prompt([
      {
        type: 'list',
        name: 'request',
        message: 'What would you like to do?',
        choices: ['Add a Department', 
                  'Add an Employee', 
                  'Add a Role',
                  'Delete an Employee', // Bonus
                  'Update Employees Role',
                  'Update Employees Manager', // Bonus 
                  'View All Departments', 
                  'View All Employees', 
                  'View All Roles', 
                  'View Department Budget', // Bonus
                  'View Employees by Department', // Bonus
                  'View Employees by Manager' // Bonus
                 ],
        loop: false,
      },
  ])

  .then((data) => {
      const {request} = data;
      console.log(request);
    //   Switch case
    switch (request) {
        case 'Add a Department':
          newDept();
          break;
        case 'Add a Role':
          newRole();
          break;
        case 'Add an Employee':
          newEmp();
          break;
        case 'Delete an Employee':
          delEmp();
          break;
        case 'Update Employees Role':
          updateEmpRole();
          break;
        case 'Update Employees Manager':
          updateEmpManager();
          break;
        case 'View All Departments':
          viewDepts();
          break;
        case 'View All Employees':
          viewEmps();
          break;
        case 'View All Roles':
          viewRoles();
          break;         
        case 'View Department Budget':
          viewBudgets();
          break;
        case 'View Employees by Department':
          viewEmpByDept();
          break;
        case 'View Employees by Manager':
          viewEmpByMgr();
          break;                
    
        default:
            break;
    }
  })
}

chooseRequest();
})();