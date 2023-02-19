import classes from "./Styles.module.css";

export default function Input(props) {

    return(
        <input  
            value={props.value}
            className={classes.input} 
            type={props.type}
            placeholder={props.placeholderName}
            onChange={props.onChange}/>
    );
}