import React from 'react';
import save from '../assets/img/save.svg'
import report from '../assets/img/report.svg'
import transfer from '../assets/img/transfer.svg'

const Information = () => {
    return ( 
        <div className="info">
            <div className="title">Information</div>
            <div className="card-content">
                <div className="card">
                <div className="card-header">
                        <img src={transfer} alt="" />
                    </div>
                    <div className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Eaque dolorem error amet quas 
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <img src={report} alt="" />
                    </div>
                    <div className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Eaque dolorem error amet quas 
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <img src={save} alt="" />
                    </div>
                    <div className="description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Eaque dolorem error amet quas 
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Information;