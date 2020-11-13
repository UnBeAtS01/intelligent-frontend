import React from 'react';
import './detect.css';
const Detect = ({ imageUrl, box }) => {
    return (
        <div className='center'>
            <div className='absolute mt3'>
                <img id='inputimage' src={imageUrl} alt='' width='500px' height='auto' />
                <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>

    );
}

export default Detect;