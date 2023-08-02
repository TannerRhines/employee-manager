const inquirer = require('enquirer');
const cTable = require("console.table");

const sql = require('./db/query_lib');


// adds a new department
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


  // adds an employee
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