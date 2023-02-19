import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import Header from '../../UI/Header';
import getCookies from '../../utils/cookies';
import classes from '../../UI/Styles.module.css';


export default function AccountPage() {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState({});
  const [tasks, setTasks] = useState({});
  const [subtasks, setSubtasks] = useState({});

  const navigator = useNavigate()

  useEffect(()=>{
    setUser(getCookies());
  }, [])
  
  return (
    <div>
      <Header path={useLocation().pathname}></Header>
      { user.id ? 
      <div className={classes.registeBlock}>
        <div>
          <div className={classes.text}>{user.name} {user.patronymic} {user.surname}</div>
          <div className={classes.text}>{user.email}</div>
        </div>
        <div>
          <button className={classes.btnNormal} onClick={()=>(navigator('/projects'))}>Projects</button>
          <button className={classes.btnNormal} onClick={()=>(navigator('/tasks'))}>Tasks</button>
        </div>
      </div>
      : <button onClick={()=>{return navigator('/login')}} className={`${classes.registeBlock} ${classes.btnNormal} ${classes.text}`}>Login</button>
      }
    </div>
  )
}
