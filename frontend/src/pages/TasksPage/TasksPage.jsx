import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, Link, useNavigate } from 'react-router-dom'
import Header from '../../UI/Header'
import getActivities from '../../utils/APIWork';
import getCookies from '../../utils/cookies';
import localclasses from '../styles/Styles.module.css';
import globalclasses from '../../UI/Styles.module.css';
import ProjectRender from '../../UI/ProjectRender';

function loadData(setUser, setEndedProjects, setActiveProjects) {
  let user = getCookies();
  setUser(user);
  getActivities(`http://alexander.kizimenko.fvds.ru/api/v1/docs/task/main/by/user/${user.id}/?is_ended=1`, setEndedProjects);
  getActivities(`http://alexander.kizimenko.fvds.ru/api/v1/docs/task/main/by/user/${user.id}/?is_ended=0`, setActiveProjects);
};

export default function TasksPage() {
  const [user, setUser] = useState({});
  const [endedProjects, setEndedProjects] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  let navigation = useNavigate();

  useEffect(()=>{
    loadData(setUser, setEndedProjects, setActiveProjects);
  }, []);

  return (
    <span >
      <Header path={useLocation().pathname}></Header>
      <div className={`${globalclasses.titleText}`}>Active tasks</div>
      <div className={globalclasses.registeBlock}>
        <ProjectRender
          globalclasses={globalclasses}
          localclasses={localclasses}
          projects={activeProjects}
        />
      </div>
      <div className={`${globalclasses.titleText}`}>Complited tasks</div>
      <div className={globalclasses.registeBlock}>
        <ProjectRender
          globalclasses={globalclasses}
          localclasses={localclasses}
          projects={endedProjects}
          url={'tasks'}
        />
      </div>
      <button  className={`${globalclasses.titleText} ${globalclasses.btnNormal}`}
      onClick={()=>(
        navigation('create')
      )}
      >Create new task</button>
    </span>
  )
}
