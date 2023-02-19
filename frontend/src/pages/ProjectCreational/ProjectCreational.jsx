import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import Header from '../../UI/Header'
import getActivities from '../../utils/APIWork';
import getCookies from '../../utils/cookies';
import localclasses from './Styles.module.css';
import globalclasses from '../../UI/Styles.module.css';
import ProjectRender from '../../UI/ProjectRender';

function loadData(setUser, setEndedProjects, setActiveProjects) {
  let user = getCookies();
  setUser(user);
  getActivities(`http://alexander.kizimenko.fvds.ru/api/v1/docs/projects/by/user/${user.id}?is_ended=1`, setEndedProjects);
  getActivities(`http://alexander.kizimenko.fvds.ru/api/v1/docs/projects/by/user/${user.id}?is_ended=0`, setActiveProjects);
};
export default function ProjectCreational() {
    const [user, setUser] = useState({});
    const [endedProjects, setEndedProjects] = useState([]);
    const [activeProjects, setActiveProjects] = useState([]);
  
    useEffect(()=>{
      loadData(setUser, setEndedProjects, setActiveProjects);
    }, []);
    return (
        <div>
        <Header path={useLocation().pathname}></Header>
 
        </div>
    )
}