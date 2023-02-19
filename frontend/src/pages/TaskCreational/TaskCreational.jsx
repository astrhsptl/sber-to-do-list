import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, Link, useNavigate } from 'react-router-dom'
import Header from '../../UI/Header'
import getActivities from '../../utils/APIWork';
import getCookies from '../../utils/cookies';
import localclasses from '../styles/Styles.module.css';
import globalclasses from '../../UI/Styles.module.css';
import ProjectRender from '../../UI/ProjectRender';
import Input from '../../UI/Input';
import capitalizeFirstLetter from '../../utils/utils';
import axios from 'axios';

async function loadData(setUser, setStatuses, setSubTasks ) {
  let user = getCookies();

  let statuses = await axios.get(`http://alexander.kizimenko.fvds.ru/api/v1/docs/status/`);
  let tasks = await axios.get(`http://alexander.kizimenko.fvds.ru/api/v1/docs/subtasks/by/user/${user.id}/`);
  setUser(user);  
  await setStatuses(statuses.data);
  await setSubTasks(tasks.data);
};

async function createNewTask(data, user, redirect){
  data.participants = [user.id]
  await axios.post(`http://alexander.kizimenko.fvds.ru/api/v1/docs/task/main/`, data);
  return redirect
};

export default function TaskCreational() {
  const [user, setUser] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [subTasks, setSubTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    "title": "",
    "discription": "",
    "file": null,
    "deadline": null,
    "status": null,
    "sub_task": [],
    "participants": []
  });
  const [inputComponents, setInputComponents] = useState({
    "title": "",
    "discription": "",
  });
  const [selectComponents, setSelectComponents] = useState({
    "sub_task": [],
    "participants": []
  });
  const navigation = useNavigate()

  useEffect(()=>{
    loadData(setUser, setStatuses, setSubTasks);
  }, []);

  useEffect(()=>{
    console.log(newTask)
  }, [newTask]);

  return (
    <div>
      <Header path={useLocation().pathname}></Header>
      <div className={globalclasses.registeBlock}>
        {Object.keys(inputComponents).map(currentField => (
          <Input 
            key={currentField}
            type={currentField} 
            placeholderName={capitalizeFirstLetter(currentField)} 
            onChange={e => setNewTask({ ...newTask, [currentField]: e.target.value })}>  
          </Input>))}

          <select
            onChange={e => setNewTask({ ...newTask, status: e.target.value })}
          >
            {statuses.map(currentStatus => 
              <option value={currentStatus.id}>{currentStatus.title}</option>
              )}
          </select>
          
          <select
            onChange={e => setNewTask({ ...newTask, sub_task: newTask.sub_task.concat([...newTask.sub_task, e.target.value]) })}
          >
            {subTasks.map(currentTask => 
              <option value={currentTask.id}>{currentTask.title}</option>
              )}
          </select>

        <button className={globalclasses.btnNormal} onClick={
          () => (createNewTask(
            newTask, user, navigation('/tasks')
          ))}>Create tasks</button>
      </div>
    </div>
  )
}