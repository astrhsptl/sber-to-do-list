import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import Header from '../../UI/Header';
import getCookies from '../../utils/cookies';
import classes from '../styles/Styles.module.css';


export const UserContext = React.createContext({});

function preprocessingTask(task){
    let sub_tasks = [];
    let participants = [];

    for (let i=0; i<task.sub_task.length; i++){
        sub_tasks.push(task.sub_task[i].id)
    };    
    for (let i=0; i<task.participants.length; i++){
        participants.push(task.participants[i].id)
    };
    task.participants = participants;
    task.sub_task = sub_tasks;

    return task;
};

function preprocessingProject(project){
    let tasks = [];
    let participants = [];

    for (let i=0; i<project.tasks.length; i++){
        tasks.push(project.tasks[i].id)
    };    
    for (let i=0; i<project.participants.length; i++){
        participants.push(project.participants[i].id)
    };
    project.participants = participants;
    project.tasks = tasks;

    return project;
};

async function getActivity(link, setter) {
    let request = await axios.get(link);
    let data = await request.data;
    await setter(data[0])
  };
  
async function patchData(e, project, setProjects){
    e.preventDefault()
    project = preprocessingProject(project);

    let a = await axios.patch(`http://alexander.kizimenko.fvds.ru/api/v1/docs/projects/${project.id}/`, project);
    getActivity(`http://alexander.kizimenko.fvds.ru/api/v1/docs/projects/${project.id}/`, setProjects)
};

async function getUserAndTasks(setTasks, setUserList,setUser){
    let user = await getCookies();
    await setUser(user);
    let tasks = await axios.get(`http://alexander.kizimenko.fvds.ru/api/v1/docs/task/main/by/user/${user.id}/`);
    let users = await axios.get(`http://alexander.kizimenko.fvds.ru/api/v1/docs/auth/users/`);


    await setUserList(users.data)
    await setTasks(tasks.data)
};

function removeItem(arr, value) { 
    const index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

function controlTasks(e, task, project, setProjects){
    e.preventDefault();
    console.log(project.tasks[1] == preprocessingTask(task))
    project.tasks.includes(task) ?
        setProjects({...project, tasks: project.tasks.concat([...project.tasks, task]) }) 
        : setProjects({...project, tasks: removeItem(project.tasks, task) })
};


// function controlParticipants(e, participant, project, setProjects){
//     e.preventDefault();
//     console.log(participant)
//     console.log(project.participants.includes(participant))
//     project.participants.includes(participant) ?
//         setProjects({...project, participants: project.tasks.splice(project.participants.indexOf(participant), 1) })
//         : setProjects({...project, participants: project.tasks.concat([...project.participants, participant]) }) 

//     };

export default function DetailProject() {
    let {id} = useParams() 
    const [user, setUser] = useState({});
    let [project, setProjects] = useState({});
    let [tasks, setTasks] = useState([]);
    let [userList, setUserList] = useState([]);

    useEffect(()=>{
      getUserAndTasks(setTasks, setUserList, setUser);
      getActivity(`http://alexander.kizimenko.fvds.ru/api/v1/docs/projects/${id}/`, setProjects);
    }, []);

    useEffect(()=>{
        console.log(project);
    }, [project]);

  return (
    <div>
        <Header path={useLocation().pathname}></Header>
        <form enctype='multipart/form-data'>
            <div>
                    <div className={` ${classes.projectText}`}>Title: <input value={project.title} onChange={e => 
                        setProjects({ ...project, title: e.target.value })}/></div>

                    <div className={``}>Discription: <input value={project.discription} onChange={e => 
                        setProjects({ ...project, discription: e.target.value })}/></div>
                    <div className={``}>File: <input type="file" value={project.file} onChange={e => 
                        setProjects({ ...project, file: e.target.value })}/></div>
                    
                    <div className={`${classes.participants}`}>
                            {tasks.map( task =>
                            <div>
                                <b>Title:</b>
                                <button onClick={e =>(controlTasks(e, task, project, setProjects))}>{task.title}</button>
                            </div>
                            )}
                    </div>
{/* 
                    <div className={`${classes.participants}`}>
                            {userList.map( participant =>
                            <div>
                                <b>Title:</b>
                                <button onClick={e =>(controlParticipants(e, participant, project, setProjects))}> {participant.email}</button>
                            </div>
                            )}
                    </div> */}
                <div className="project-status">Status: <input value={project.status} onChange={e => 
                        setProjects({ ...project, status: e.target.value })}/></div>
            </div>
            <button onClick={(e)=>(patchData(e, project, setProjects))}>Update</button>
        </form>
    </div>
  )
}
