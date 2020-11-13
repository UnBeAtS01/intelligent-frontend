import React from 'react';

import './search.css'
const Search = ({onInputChange,onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {'Face recogination in your pictures'}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 ka center'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>

            </div>
        </div>
    );
}

export default Search;