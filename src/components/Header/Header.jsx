import React from 'react';
import {Segment,Header, Grid} from 'semantic-ui-react';
import './Header.css';

export default function PageHeader() {
    return (
        <Segment className="Page-Header">
            <Grid>
                <Grid.Column floated="left" width={4}>
                    <Header as="h1" id="app-name">Scripter</Header>
                </Grid.Column>
            <Grid.Column floated="right" width={4}>
                <div class="auth-link">
                    Log In Link to go here
                </div>
            </Grid.Column>
            </Grid>
        </Segment>
    )
}