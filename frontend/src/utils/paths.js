import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

const paths = [
    {path: '/', component: HomePage, name: 'Home', exact: true,},
    {path: '/register/', component: RegisterPage, name: 'Register', exact: true},
    {path: '/login/', component: LoginPage, name: 'Login', exact: true},
  ];

export default paths;