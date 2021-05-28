import React, { useState } from 'react';
import registerSVG from '../assets/img/register.svg'
import { connect } from "react-redux";
import * as usersActions from '../redux/actions/users.actions'
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Link } from 'react-router-dom'

const initState = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const validate = values => {
    const erros = {}
    console.log("values",values)
    
    if(values.firstName == ""){
        erros.firstName = 'required'
    }
    if(values.lastName == ""){
        erros.lastName = 'required'
    }
    if(values.email == ""){
        erros.email = 'required'
    }
    if(values.password == ""){
        erros.password = 'required'
    }
    return erros;
}

const Register = (props) => {
    console.log(props)
    const { register, loading, userError, message } = props;
    const [formUser, setformUser] = useState(initState)
    const [error, setError] = useState(initState)

    const handleSubmit = (e) => {
        e.preventDefault()
        const result = validate(formUser);
        // if there is an error we load the wrong values
        setError(result)
        if(!Object.keys(result).length){
            
            register(formUser);
        }
    }
    const hanldeChange = ({target}) => {

        setformUser({
            ...formUser,
            [target.name]: target.value
        });
    }
    return ( 
        <>
        { loading && <Loading />}
        <div className="login">
            <div className="login-info">
                <img src={registerSVG} alt="" />
            </div>
            <div className="login-form">

                <div className="title">User Register</div>

                 <form onSubmit={handleSubmit}>

                    <input type="text" 
                        placeholder="FirstName" 
                        name="firstName"
                        onChange={hanldeChange}
                        />
                    {error.firstName && <p className="error">{error.firstName}</p>}

                    <input type="text" 
                        placeholder="LastName" 
                        name="lastName"
                        onChange={hanldeChange}
                        />
                    {error.lastName && <p className="error">{error.lastName}</p>}

                    <input type="text" 
                        placeholder="Emil" 
                        name="email"
                        onChange={hanldeChange}
                    />
                    {error.email && <p className="error">{error.email}</p>}

                    <input type="password" 
                        placeholder="Password" 
                        name="password"
                        onChange={hanldeChange}
                    />
                    {error.password && <p className="error">{error.firstName}</p>}

                    <button className="btn-primary" type="submit">Register</button>
                    <Link to="/login">Login</Link>

                    <center>
                        { message && <p> { message } </p> }

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
 
export default connect(mapStateToProps, mapDispatchToProps)(Register);