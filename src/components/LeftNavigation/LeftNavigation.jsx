import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Divider } from 'semantic-ui-react';
import './LeftNavigation.css';

export default function LeftNavigation({ownerIndex, ownerName, user}){
    
    return (
        <div className="LeftNavigation">
            <Button as={Link} to="/scripts/new">Add New Script</Button>
            <Divider horizontal>
                <Header as="p">Quick Links</Header>
            </Divider>
            <Link to ={`/dashboard`}>Dashboard</Link>
            { ownerIndex && ownerIndex !== user ?
                <Link to={`/author/${ownerIndex}`}>{ownerName}'s Profile</Link>
                :
                ''
            }
            <Link to="/script/ideas">Idea Generator</Link>
        </div>
    );
}