import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import Header from '../../UI/Header'
import getActivities from '../../utils/APIWork';
import getCookies from '../../utils/cookies';
import localclasses from '../styles/Styles.module.css';
import globalclasses from '../../UI/Styles.module.css';
import ProjectRender from '../../UI/ProjectRender';

function loadData(setUser, setEndedProjects, setActiveProjects) {
  let user = getCookies();
  setUser(user);
  getActivities(`http://alexander.kizimenko.fvds.ru/api/v1/docs/projects/by/user/${user.id}?is_ended=1`, setEndedProjects);
  getActivities(`http://alexander.kizimenko.fvds.ru/api/v1/docs/projects/by/user/${user.id}?is_ended=0`, setActiveProjects);
};

export default function ProjetcsPage() {
  const [user, setUser] = useState({});
  const [endedProjects, setEndedProjects] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);

  useEffect(()=>{
    loadData(setUser, setEndedProjects, setActiveProjects);
  }, []);

  return (
    <span >
      <Header path={useLocation().pathname}></Header>
      <div className={`${globalclasses.titleText}`}>Active projects</div>
      <div className={globalclasses.registeBlock}>
        <ProjectRender
          globalclasses={globalclasses}
          localclasses={localclasses}
          projects={activeProjects}
          url={'projects'}
        />
      </div>
      <div className={`${globalclasses.titleText}`}>Complited projects</div>
      <div className={globalclasses.registeBlock}>
        <ProjectRender
          globalclasses={globalclasses}
          localclasses={localclasses}
          projects={endedProjects}
          url={'projects'}
        />
      </div>
      <button className={`${globalclasses.titleText} ${globalclasses.btnNormal}`}>Create new project</button>
    </span>
  )
}