import classes from './Styles.module.css';

export default function Button(props){
    return(
        <button  className={`${classes.btn}`}>{props.title}</button>
    );

}