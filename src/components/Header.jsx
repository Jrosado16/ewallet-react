import React from 'react';
import person from '../assets/img/p.svg'
import { Link } from 'react-router-dom'


const Header = () => {
    return ( 
        <header>
            <div className="fondo-header">
                <nav className="navbar">
                    <div className="logo">
                        EWALLET
                    </div>
                    <div className="navegation">
                        <ul className="nav">
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/register'>Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="content-header">
                    <div className="ewallet">
                        <div className="name">
                            EWALLET
                        </div>
                        <div className="description">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis enim odio animi ea sapiente. Voluptate cum quisquam, repellendus mollitia assumenda, accusantium repellat iure explicabo, nisi eos corporis iusto porro nulla.
                        </div>
                        <button>Explore</button>
                    </div>
                    <div className="e-img">
                        <img src={person} alt="l" />
                    </div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;