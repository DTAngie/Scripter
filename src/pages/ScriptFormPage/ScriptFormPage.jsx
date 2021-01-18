import React from 'react';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import NewScriptForm from '../../components/NewScriptForm/NewScriptForm';
import * as ScriptAPI from '../../utils/scriptService.js';

export default function ScriptFormPage({formType}){

    async function handleAddScript(data) {
        try {
            await ScriptAPI.create(data);
            //TOD after posted, show script detail page.
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation />
                </Grid.Column>
                <Grid.Column width={8}>
                    { formType === "create" ?
                    <NewScriptForm handleAddScript={handleAddScript}/>
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