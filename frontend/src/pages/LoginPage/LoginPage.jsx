import React, { useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../../UI/Header'
import Input from '../../UI/Input'
import api_paths from '../../utils/APIMap';
import setCookie from '../../utils/cookies';
import capitalizeFirstLetter from '../../utils/utils';
import Button from '../../UI/Button';
import classes from "../../UI/Styles.module.css";


export default function LoginPage() {
  let [inputData, setInputData] = useState({
    email: '',
    password: '',
  });
  let navigate = useNavigate()

  async function APIRequest(navigate) {
    let resp = await axios.post(api_paths.login, inputData);

    await resp.status === 200 ? Object.keys(resp.data).map( responseParametr => (document.cookie=`${responseParametr}=${resp.data[responseParametr]}`)) : console.log();
    
    await console.log(document.cookie);
    await console.log(resp.data);
    return navigate('/account')
  };

    

  return (
    <div className={classes.login}>
      <Header path={useLocation().pathname}></Header>

      <div className={classes.registeBlock}>
        {Object.keys(inputData).map(currentInputName => (
          <Input 
            key={currentInputName}
            type={currentInputName} 
            placeholderName={capitalizeFirstLetter(currentInputName)} 
            onChange={e => setInputData({ ...inputData, [currentInputName]: e.target.value })}>  
          </Input>))}

        <button className={classes.btnNormal} onClick={() => (APIRequest(navigate))}>Log in</button>
      </div>
  </div>
  )
}
