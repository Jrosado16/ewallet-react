import React, { useEffect, useState } from 'react';
import loginSvg from '../assets/img/login.svg'
import { connect } from "react-redux";
import * as usersActions from '../redux/actions/users.actions'
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Link, useHistory } from 'react-router-dom'

//validate that the form fields are not empty
const validate = values => {
    const erros = {}
    console.log("values",values)
    if(values.username == ""){
        erros.username = 'required'
    }
    if(values.password == ""){
        erros.password = 'required'
    }
    return erros;
}
const Login = (props) => {
    const { loading, userError, users } = props;
    const history = useHistory();
    //state form
    const [formUser, setformUser] = useState({
        username: '',
        password: ''
    })
    //state error
    const [error, setError] = useState({
        username: '',
        password: ''
    })
    useEffect(()=> {
        props.getToken();
        console.log(Object.keys(users).length)
        if( Object.keys(users).length){
            props.getProfile();
            props.getRecord()
            history.push("/profile");
        }
    }, [users])
    const handleChange = ({target}) => {
        const { name, value } = target;
        setformUser({
            ...formUser,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const result = validate(formUser);
        // if there is an error we load the wrong values
        setError(result)
        if(!Object.keys(result).length){
            props.login(formUser)
        }
    }
    return ( 
        <>
        { loading && <Loading />}
        <div className="login">
            <div className="login-info">
                <img src={loginSvg} alt="" />
            </div>
            <div className="login-form">
                <div className="title">Login</div>
                <form onSubmit={handleSubmit}>
                    <input type="email" 
                        placeholder="email" 
                        name="username"
                        onChange={handleChange}
                        />
                    {/* show error username */}
                    {error.username && <p className="error">{error.username}</p>}
                    <input type="password" 
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        />
                    {/* show error password */}
                    {error.password && <p className="error">{error.password}</p>}

                    <button className="btn-primary" type="submit">Login</button>
                    <Link to="/Register">create user</Link>
                    <center>
                        { userError && <Error message={userError} />}

                    </center>
                </form>
            </div>
        </div>
        </>
     );
}

const mapStateToProps = state => {
    return state.userReducer;
}

const mapDispatchToProps = {
    ...usersActions
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Login);