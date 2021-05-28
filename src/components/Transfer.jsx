import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as usersActions from '../redux/actions/users.actions'

const validate = values => {
    const erros = {}
    console.log("values",values)
    if(values.userReceived == ""){
        erros.userReceived = 'required'
    }
    if(values.amount == ""){
        erros.amount = 'required'
    }
    return erros;
}
const initState = {
    userReceived: '',
    amount: ''
}
const Transfer = (props) => {
    console.log(props)
    const {getProfile, errorMsg, transferBalance, userError, message, resetMsg, users: { profile } } = props;
    //state form
    const [formBalance, setFormBalance] = useState(initState)
    //state error
    const [error, setError] = useState(initState)
    //message

    const handleChange = ({target}) => {
        const { name, value } = target;
        setFormBalance({
            ...formBalance,
            [name]: value
        })
    }

    const resetMSG = () => {
        resetMsg();
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const result = validate(formBalance);
        // if there is an error we load the wrong values
        setError(result)
        if(!Object.keys(result).length){
            // props.login(formUser)
            console.log(formBalance.userReceived)
            if(formBalance.amount <= profile.balance){
                transferBalance(formBalance)
                setFormBalance(initState);
                getProfile()
            }else{
                errorMsg('Insufficient Balance');
            }
        }
    }
    return (  
        <div className="transfer">
            <div className="title">Transfer Funds</div>
            <form onSubmit={handleSubmit}>
                <input type="email" 
                    placeholder="email"
                    name="userReceived"
                    onChange={handleChange}
                    value={formBalance.userReceived}

                />
                {error.userReceived && <p className="error">{error.userReceived}</p>}
                <input type="number" 
                    placeholder="amount"
                    name="amount"
                    onChange={handleChange}
                    value={formBalance.amount}
                />
                {error.amount && <p className="error">{error.amount}</p>}
                <button type="submit">Send</button>
            </form>
            { message && <p> { message } <button className="close" onClick={resetMSG}>X</button> </p>}
            { userError && <p className="error center"> { userError } <button className="close" onClick={resetMSG}>X</button></p>}
        </div>
    );
}
 
const mapStateToProps = (state) => {
    return state.userReducer;
}
const mapDispatchToProps = {
    ...usersActions
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Transfer);