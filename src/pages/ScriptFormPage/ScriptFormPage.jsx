import React from 'react';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import NewScriptForm from '../../components/NewScriptForm/NewScriptForm';

export default function ScriptFormPage({formType}){
    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation />
                </Grid.Column>
                <Grid.Column width={8}>
                    { formType === "create" ?
                    <NewScriptForm />
                    : 
                    <div>update form{formType}</div>
                    }
                </Grid.Column>
                <Grid.Column width={4}>
                    Side Content
                </Grid.Column>
            </Grid>
            
        </>
    );
}