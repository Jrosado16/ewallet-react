import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import Loading from '../components/Loading';
import Transfer from '../components/Transfer';
import * as usersActions from '../redux/actions/users.actions'

const validate = values => {
    const erros = {}
    console.log("values",values)
    if(values.type == ""){
        erros.type = 'required'
    }
    if(values.amount == ""){
        erros.amount = 'required'
    }
    return erros;
}

const Profile = (props) => {
    const { users } = props;
    const history = useHistory();

    const useAuth = () => {
        // props.getProfile()
        if (!users.access_token) {
            history.push("/login");
        }
        return users.access_token ? true : false;
      };
      
    return useAuth() && <MyProfile props={props} />
}
const initState = {
    amount: '',
    type: ''
}
const MyProfile = ({props}) => {
    const { users: { profile }, loading, updateBalance, logout  } = props;

    const [balance, setBalance ] = useState(initState);
    const [errorMSG, setErrorMSG] = useState(initState)

    const [ error, setError ] = useState('')
    const [ message, setMessage ] = useState('')

    const history = useHistory();

    const ftLogout = () => {
        logout();
        history.push('/login')
    }
    const resetError = () => {
        setError('')
        setMessage('')
    }
    const submitBalance = (e) => {
        e.preventDefault();
        const result = validate(balance);
        // if there is an error we load the wrong values
        setErrorMSG(result)
        if(!Object.keys(result).length){
            if(balance.type == 'add'){
                updateBalance(balance.amount, balance.type)
                setMessage('Succesful Transaction')
                setBalance({
                    ...balance,
                    amount: ''
                });
            }
            if(balance.type == 'remove'){
                if(balance.amount <= profile.balance){
                    updateBalance(balance.amount, balance.type)
                    setMessage('Succesful Transaction')
                    setBalance({
                        ...balance,
                        amount: ''
                    });
                }else{
                    setError('Insufficient balance to withdraw')
                }
            }
        }
    }
    const handleChange = ({target}) => {
        setBalance({
            ...balance,
            [target.name]: target.value
        });
    }
    return  (
        <>
            {loading &&  <Loading/>}
            <nav className="nav-profile">
                <ul>
                    <p className="logo">
                        <Link to="/profile">IWALLET</Link>
                    </p>
                    <li>
                        
                    </li>
                </ul>
                <li className="logout" onClick={ftLogout}>cerrar sesion</li>
            </nav>
            <div className="profile">
                <div className="profile-content">
                    <div className="name-user">
                        Hi, { profile ? profile.firstName : ''   }
                    </div>
                    <div className="balance">
                        <div className="description">Your balance</div>
                        <div className="amount"> $ {profile ? profile.balance : 0   }</div>
                    </div>

                    <div className="title">Add or remove your balance</div>
                    
                    <form onSubmit={submitBalance}>
                        <select name="type" onChange={handleChange}>
                            <option>Select Option</option>
                            <option value="add">Add Balance</option>
                            <option value="remove">Remove Balance</option>
                        </select>
                        {errorMSG.type && <p className="error">{errorMSG.type}</p>}
                        <input type="number" 
                            placeholder="amount"
                            name="amount"
                            value={balance.amount}
                            onChange={handleChange}
                        />
                        {errorMSG.amount && <p className="error">{errorMSG.amount}</p>}

                         { error && <p className="error"> { error } <button onClick={resetError} className="close">X</button> </p> }
                         { message && <p> { message } <button onClick={resetError} className="close">X</button> </p> }
                     <div>
                        <button type="submit">Send</button>
                    </div>
                        </form>
                </div>
                <Transfer />
            </div>
        </>
    )

}

const mapStateToProps = (state) => {
    return state.userReducer;
}
const mapDispatchToProps = {
    ...usersActions
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Profile);