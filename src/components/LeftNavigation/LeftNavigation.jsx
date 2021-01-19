import React from 'react';
import { Link } from 'react-router-dom';
import './LeftNavigation.css';

export default function LeftNavigation({ownerIndex}){
    return (
        <div className="LeftNavigation">
            <Link to="/script/new">Add New Script</Link>
            {/* // Use ternary to link to either dashboard or /author link */}
            <Link to ={`/dashboard`}>Dashboard</Link>
        </div>
    );
}