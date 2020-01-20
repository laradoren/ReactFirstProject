import React from 'react';
import preloader from '../../../126.gif';

let Preloader = (props) => {
    return (
        <div style = {{backgroundColor: '#222222'}}>
            <img src = {preloader} />
        </div>
    );
}

export default Preloader;