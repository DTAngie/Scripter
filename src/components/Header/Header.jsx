import React from 'react';
import { Link } from 'react-router-dom';
import {Segment,Header, Grid} from 'semantic-ui-react';
import './Header.css';

export default function PageHeader({user, handleLogout}) {
    return (
        <Segment className="Page-Header">
            <Grid>
                <Grid.Column floated="left" width={4}>
                    <Header as="h1" id="app-name">Scripter</Header>
                </Grid.Column>
            <Grid.Column floated="right" width={4}>
                {user ? 
                <>
                <div>
                    {user}
                </div>
                <Link to="" onClick={handleLogout}>Log Out</Link>
                </>
                :
                <Link to="/login">Log In</Link>
                }
            </Grid.Column>
            </Grid>
        </Segment>
    )
}