import React, { useState } from 'react';
import * as usersActions from '../redux/actions/users.actions'
import { connect } from 'react-redux';


const Record = (props) => {
    const { record, getRecord } = props;
    const [active, setActive ] = useState(1)
    
    // console.log(record)
    const ftMyRecord = (type = "record", a) => () => {
        getRecord(type)
        setActive(a)
    }
    // getRecord();

    return ( 
        <div className="record">
            <div className="title">Record</div>
            <div className="detail">
                <div className="action">
                    <button className={active ?  'btn-primary' : ''} onClick={ftMyRecord('record', 1)}>Sent</button>
                    <button className={!active ?  'btn-primary' : ''} onClick={ftMyRecord("record/received", 0)}>Recived</button>
                </div>
                <div className="datil">
                    <table>
                        <thead>
                            <tr>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            record &&
                            record.map(r => (
                                <tr key={r._id}>
                                    <td>{ r.userReceived }</td>
                                    <td>${ r.amount }</td>
                                    <td>{ r.created_at.substring(0, 10) }</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
     );
}
 
const mapStateToProps = (state) => {
    return state.userReducer;
}
const mapDispatchToProps = {
    ...usersActions
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Record);