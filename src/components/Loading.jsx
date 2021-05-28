import React from 'react';

const Loading = ({load}) => {
    return ( 
        <div className={load ? '' : 'loading'}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
     );
}
 
export default Loading;