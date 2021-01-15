import React from 'react';
import { Link } from 'react-router-dom';
import { Segment,Header, Grid } from 'semantic-ui-react';
import './GuestHeader.css';

export default function GuestHeader() {
    return (
        <Segment className="Page-Header">
            <Grid>
                <Grid.Column floated="left" width={4}>
                    <Header as="h1" id="app-name">Scripter</Header>
                </Grid.Column>
            <Grid.Column floated="right" width={4}>
                <Link to="/login">
                    Log In Link to go here
                </Link>
            </Grid.Column>
            </Grid>
        </Segment>
    )
}