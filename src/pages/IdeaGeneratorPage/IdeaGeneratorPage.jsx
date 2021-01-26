import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptForm from '../../components/ScriptForm/ScriptForm';
import IdeaGenerator from '../../components/IdeaGenerator/IdeaGenerator';
import * as ScriptAPI from '../../utils/scriptService.js';

export default function IdeaGeneratorPage(){
    const history = useHistory();

    async function handleAddScript(data, id=null) {
        if(id === null){
            try {
                const newScript = await ScriptAPI.create(data);
                history.push(`/scripts/${newScript.scriptID}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation ownerIndex={null}/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <IdeaGenerator />
                    <ScriptForm script={{}} handleAddScript={handleAddScript}/>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
            </Grid>
            
        </>
    );
}