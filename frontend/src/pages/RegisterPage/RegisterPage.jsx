import React, { useState } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import Header from '../../UI/Header'
import Input from '../../UI/Input'
import api_paths from '../../utils/APIMap';
import setCookie from '../../utils/cookies';
import capitalizeFirstLetter from '../../utils/utils';


export default function RegisterPage() {
  let [inputData, setInputData] = useState({
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    password: '',
  });

  async function APIRequest() {
    let resp = await axios.post(api_paths.register, inputData);
    await console.log(resp.status === 200); 

    await resp.status === 200 ? Object.keys(resp.data).map( responseParametr => (setCookie(responseParametr, resp.data[responseParametr]))) : console.log();
    await console.log(document.cookie); 
  };

    

  return (
    <div className={'register-block'}>
      <Header path={useLocation().pathname}></Header>
      This is a register page
      {Object.keys(inputData).map(currentInputName => (
        <Input 
          key={currentInputName}
          type={currentInputName} 
          placeholderName={capitalizeFirstLetter(currentInputName)} 
          onChange={e => setInputData({ ...inputData, [currentInputName]: e.target.value })}>  
        </Input>))}

      <button onClick={APIRequest}>Register</button>
    </div>
  )
}
