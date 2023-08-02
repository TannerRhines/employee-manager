const inquirer = require('enquirer');

const sql = require('./db/query_lib');














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