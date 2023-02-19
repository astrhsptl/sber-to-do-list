import AccountPage from "../pages/AccountPage/AccountPage";
import DetailProject from "../pages/DetailProject/DetailProject";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import LogoutPage from "../pages/LogoutPage/LogoutPage";
import ProjetcsPage from "../pages/ProjectsPage/ProjetcsPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import TaskCreational from "../pages/TaskCreational/TaskCreational";
import TaskDetail from "../pages/TaskDetail.jsx/TaskDetail";
import TasksPage from "../pages/TasksPage/TasksPage";


const paths = [
    {path: '/register', component: RegisterPage, name: 'Register', exact: true},
    {path: '/login', component: LoginPage, name: 'Login', exact: true},
    {path: '/account', component: AccountPage, name: 'Account', exact: true},
    {path: '/logout', component: LogoutPage, name: 'Logout', exact: true},
    {path: '/', component: HomePage, name: 'Home', exact: true,},

    {path: '/projects', component: ProjetcsPage, name: 'ProjectList', exact: true},
    {path: '/tasks', component: TasksPage, name: 'TaskList', exact: true},
    {path: '/tasks/create', component: TaskCreational, name: 'TaskCreational', exact: true},
    
    {path: '/projects/:id', component: DetailProject, name: 'DetailProject', exact: true},
    {path: '/tasks/:id', component: TaskDetail, name: 'TaskDetail', exact: true},

  ];

export default paths;