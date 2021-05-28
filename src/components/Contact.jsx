import React, { useState } from 'react';
import { connect } from 'react-redux';
import contactSvg from '../assets/img/contact.svg'
import * as usersActions from '../redux/actions/users.actions'
import Loading from './Loading';

const validate = values => {
    const erros = {}
    console.log("values",values)
    
    if(values.name == ""){
        erros.name = 'required'
    }
    if(values.subject == ""){
        erros.subject = 'required'
    }
    if(values.email == ""){
        erros.email = 'required'
    }
    if(values.description == ""){
        erros.description = 'required'
    }
    return erros;
}
const initState = {
    name: '',
    subject: '',
    email: '',
    description: ''
}
const Contact = (props) => {
    console.log(props)
    const { ftContact, message, resetMsg, userError, loading } = props;

    const [formUser, setformUser] = useState(initState)
    const [error, setError] = useState(initState)

    const handleSubmit = (e) => {
        e.preventDefault()
        const result = validate(formUser);
        // if there is an error we load the wrong values
        setError(result)
        if(!Object.keys(result).length){
            ftContact(formUser);
            setformUser(initState);
        }
    }
    const hanldeChange = ({target}) => {

        setformUser({
            ...formUser,
            [target.name]: target.value
        });
    }

    const ftResetMsg = () => {
        resetMsg()
    }

    return ( 
        <div className="contact">
            <div className="title">Contact Us</div>
            <div className="contact-content">
                <div className="form-contact">
                    <form onSubmit={handleSubmit}>
                        <input type="text" 
                            placeholder="Name *"
                            name="name"
                            onChange={hanldeChange}
                            value={formUser.name}
                        />
                        {error.name && <p className="error">{error.name}</p>}

                        <input type="text" 
                            placeholder="Subject *"
                            name="subject"
                            onChange={hanldeChange}
                            value={formUser.subject}

                        />
                        {error.subject && <p className="error">{error.subject}</p>}

                        <input type="text" 
                            placeholder="Email *"
                            name="email"
                            onChange={hanldeChange}
                            value={formUser.email}
                        />
                        {error.email && <p className="error">{error.email}</p>}

                        <textarea name="description" rows="4" cols="50"
                            placeholder="Description *"
                            name="description"
                            onChange={hanldeChange}    
                            value={formUser.description}
                        >
                        </textarea>
                        {error.description && <p className="error">{error.description}</p>}
                        <button type="submit">send</button>
                    </form>
                    { loading && <Loading load={1} />}
                    { userError && <p className="error"> { userError } <button onClick={ftResetMsg} className='close'>X</button> </p> }
                    { message && <p> { message } <button onClick={ftResetMsg} className='close'>X</button> </p> }
                </div>
                <div className="img">
                    <img src={contactSvg} alt="" />
                </div>
            </div>

        </div>
     );
}
 
const mapStateToProps = state => {
    return state.userReducer;
}

const mapDispatchToProps = {
    ...usersActions
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Contact);