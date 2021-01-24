import React from 'react';
import { Grid } from 'semantic-ui-react';
import './Footer.css';

export default function Footer() {
    return (
        <Grid className="Footer">
            <Grid.Column width={8}>
                <p>Copyright Angeline 2021</p>
            </Grid.Column>
            <Grid.Column width={8}>
                <a href='https://github.com/DTAngie' target='_blank' rel="noopener noreferrer">Github</a>
            </Grid.Column>
        </Grid>
    );
}