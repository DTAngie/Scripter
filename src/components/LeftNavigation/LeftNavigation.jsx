import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Divider } from 'semantic-ui-react';
import './LeftNavigation.css';

export default function LeftNavigation({ownerIndex}){
    return (
        <div className="LeftNavigation">
            <Button as={Link} to="/scripts/new">Add New Script</Button>
            {/* // TODO:Use ternary to link to either dashboard or /author link */}
            <Divider horizontal>
                <Header as="p">Quick Links</Header>
            </Divider>
            <Link to ={`/dashboard`}>Dashboard</Link>
        </div>
    );
}