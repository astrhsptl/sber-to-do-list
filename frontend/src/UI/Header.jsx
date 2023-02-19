import React from 'react'
import { Link } from 'react-router-dom'
import paths from '../utils/paths'
import Button from './Button'
import classes from './Styles.module.css';

export default function Header(props) {
  return (
    <header>
      <div className={`${classes.header}`}>
        <img src={props.logo} alt="" />
          {paths.slice(0, 5).map(route => (
              <Link key={route.path} to={route.path}> 
                <Button title={route.name}>
                </Button>
              </Link> 
          ))}
      </div>
    </header>
  )
}
