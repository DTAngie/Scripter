import React from 'react';
import { Grid } from 'semantic-ui-react';
import PageHeader from '../../components/Header/Header';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';

export default function DashboardPage({handleLogout}){
    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation />
                </Grid.Column>
                <Grid.Column width={8}>
                    Main Content
                </Grid.Column>
                <Grid.Column width={4}>
                    Side Content
                </Grid.Column>
            </Grid>
        </>
    )
}