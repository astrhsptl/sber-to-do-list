import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../../UI/Header'
import getActivities from '../../utils/APIWork';
import getCookies from '../../utils/cookies';
import localclasses from '../styles/Styles.module.css';
import globalclasses from '../../UI/Styles.module.css';
import modalClasses from './Modal.module.css';
import ProjectRender from '../../UI/ProjectRender';
import Input from '../../UI/Input';
import capitalizeFirstLetter from '../../utils/utils';
import axios from 'axios';

async function patchData(e, task, redirect){
    e.preventDefault()
    console.log(task);
    let a = await axios.patch(`http://alexander.kizimenko.fvds.ru/api/v1/docs/task/main/${task.id}/`, task);
    await console.log(a.data);
    return redirect
};


function preprocessingTask(task){
    let sub_tasks = [];
    let participants = [];

    for (let i=0; i<task.sub_task?.length; i++){
        if (typeof task.sub_task[i] != 'string'){
            sub_tasks.push(task.sub_task[i].id)
        };
    };    
    for (let i=0; i<task.participants?.length; i++){
        participants.push(task.participants[i].id)
    };
    task.participants = participants;
    task.sub_task = sub_tasks;

    return task;
};

async function loadData(setUser, setStatuses, setSubTasks, setTask, setUserList, id) {
    let user = getCookies();
  
    let statuses = await axios.get(`http://alexander.kizimenko.fvds.ru/api/v1/docs/status/`);
    let subTasks = await axios.get(`http://alexander.kizimenko.fvds.ru/api/v1/docs/subtasks/`)//by/user/${user.id}/`);
    let getUserList = await axios.get(`http://alexander.kizimenko.fvds.ru/api/v1/docs/auth/users/`)
    let task = await axios.get(`http://alexander.kizimenko.fvds.ru/api/v1/docs/task/main/${id}`);

    setUser(user);
    
    await setTask(task.data[0]);
    await setUserList(getUserList.data);
    await setStatuses(statuses.data);
    await setSubTasks(subTasks.data);
  };


function CloseModal(setGlobalTask, globalTask, subTask, setIsShowed) {
    setGlobalTask({ ...globalTask, sub_task: globalTask.sub_task.concat([subTask]) })
    setIsShowed(false)
};

function CloseParticipantModel(globalTask, setGlobalTask, subTask, setIsShowed) {
    setGlobalTask({ ...globalTask, participants: globalTask.participants.concat([subTask]) })
    setIsShowed(false)
};

export default function TaskDetail() {
    let {id} = useParams() 
    const [isShowed, setIsShowed] = useState(false); 
    const [isUserShowed, setIsUserShowed] = useState(false); 
    const [userList, setUserList] = useState([])
    const [user, setUser] = useState({});
    const [statuses, setStatuses] = useState([]);
    const [subTasks, setSubTasks] = useState([]);
    const [task, setTask] = useState({});
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
      loadData(setUser, setStatuses, setSubTasks, setTask, setUserList, id);
    }, []);

    useEffect(()=>{
        // console.log(Particitant)
      
    }, [task]);

    return (
      <div>
        <Header path={useLocation().pathname}></Header>
        <div className={globalclasses.registeBlock}>
          {Object.keys(inputComponents).map(currentField => (
            <input 
              key={currentField}
              type={currentField} 
              value={task[currentField]}
              placeholder={capitalizeFirstLetter(currentField)} 
              onChange={e => setTask({ ...task, [currentField]: e.target.value })}>  
            </input>))}
  
            <select
              value={task.status}
              onChange={e => setTask({ ...task, status: e.target.value })}
            >
              {statuses.map(currentStatus => 
                <option value={currentStatus.id}>{currentStatus.title}</option>
                )}
            </select>
            

            <div className={`${globalclasses.prettyTask}`}>
                <b>Tasks:</b>
                <ul>
                {task.sub_task?.map( currentSubTask =>
                    <li> {currentSubTask.title}</li>)}
                </ul>
                <button className={`${globalclasses.appendBtn}`} onClick={()=>(setIsShowed(true))}>Append task</button>
            </div>

            <div className={isShowed ? `${modalClasses.standart}` : `${modalClasses.down}`} >
                <div className={`${globalclasses.prettyTask}`}>

                <b>Tasks:</b><br/>
                {subTasks?.map(currentSubTask =>
                    <button onClick={ () => (CloseModal(setTask, task, currentSubTask, setIsShowed))}
                    className={globalclasses.btnNormal}> {currentSubTask.title}</button>)}
                <button className={`${globalclasses.appendBtn}`} onClick={()=>(setIsShowed(false))}>Close</button>
                </div>
            </div>

            <div className={`${globalclasses.prettyTask}`}>
                <b>User list:</b>
                <ul>
                {task.participants?.map( currentParticipant =>
                    <li> {currentParticipant.email}</li>)}
                </ul>
                <button className={`${globalclasses.appendBtn}`} onClick={()=>(setIsUserShowed(true))}>Add participant</button>
            </div>

            <div className={isUserShowed ? `${modalClasses.standart}` : `${modalClasses.down}`} >
                <div className={`${globalclasses.prettyTask}`}>
                <b>Users:</b><br/>
                {userList?.map( participant =>
                    <button onClick={ () => (CloseParticipantModel(task, setTask, participant, setIsUserShowed))}
                    className={globalclasses.btnNormal}> {participant.email}</button>)}
                    <button className={`${globalclasses.appendBtn}`} onClick={()=>(setIsUserShowed(false))}>Close</button>
                </div>
            </div>
          
          <button className={globalclasses.btnNormal} 
            // onClick={
            // () => (createNewTask(
            //   newTask, user, navigation('/tasks')))}
            onClick={(e)=>(patchData(e, preprocessingTask(task),  navigation('/tasks')))}
            >Update task</button>
        </div>
      </div>
    )
  }