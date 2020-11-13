import React from 'react';
import './navigation.css';
const Navigation = ({ isSignin,onRouteChange}) => {
    if (isSignin) {
        return (
            <nav style={{ display: "flex", justifyContent: 'flex-end', }}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim  ba pa3 pointer ma3 shadow-2 a' > Sign Out</p>
            </nav>
        );
    }
    else {
        return (
                <nav style={{ display: "flex", justifyContent: 'flex-end', }}>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim  ba pa3 pointer ma3 shadow-2 a' > Sign In</p>
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim  ba pa3 pointer ma3 shadow-2 a' > Register</p>
                </nav>

        );
    }

}

export default Navigation;