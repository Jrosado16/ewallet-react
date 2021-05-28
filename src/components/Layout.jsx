import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'


const LayoutProfile = ({children}) => {
    const history = useHistory();
    console.log(history.location.pathname)
    console.log(path)
    const path = history.location.pathname.indexOf('profile');
    // useEffect(() =>{

    // }, [path])
    const nav = (
        <nav className="nav-profile">
            <ul>
                <p className="logo">
                    <Link to="/profile">iWALLET</Link>
                </p>
                <li>resumen</li>
                <li>
                    <Link to="/profile/record">Record</Link>
                </li>
            </ul>
            <li>cerrar sesion</li>
        </nav>
    )
    return ( 
        <>
        {/* {path} */}
            {path && nav}
            {children}
        </>
     );
}
 
export default LayoutProfile;