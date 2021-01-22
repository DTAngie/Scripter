import React from 'react';
import { Link } from 'react-router-dom';
import {Segment,Header, Grid, List} from 'semantic-ui-react';
import './Header.css';

export default function PageHeader({user, handleLogout}) {
    return (
        <Segment className="Page-Header">
            <Grid>
                <Grid.Column floated="left" width={4}>
                    <Link to={user ? '/dashboard' : '/'}>
                        <Header as="h1" id="app-name">Scripter</Header>
                    </Link>
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
                <List horizontal>
                    <List.Item>
                        <Link to="/signup">Sign Up</Link>
                    </List.Item>
                    <List.Item>
                        <Link to="/login">Log In</Link>
                    </List.Item>
                </List>
                }
            </Grid.Column>
            </Grid>
        </Segment>
    )
}