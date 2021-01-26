import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptForm from '../../components/ScriptForm/ScriptForm';
import IdeaGenerator from '../../components/IdeaGenerator/IdeaGenerator';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import * as ScriptAPI from '../../utils/scriptService.js';

export default function IdeaGeneratorPage(){
    const history = useHistory();
    const [error, setError] = useState('');

    async function handleAddScript(data, id=null) {
        setError('');
        if(id === null){
            try {
                const newScript = await ScriptAPI.create(data);
                if (newScript['404']){
                    setError('Something went wrong. Please try again.');
                } else {
                    history.push(`/scripts/${newScript.scriptID}`);
                }
            } catch (err) {
                setError('Something went wrong. Please try again.');
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
                    <ErrorMessage error={error} />
                    <IdeaGenerator />
                    <ScriptForm script={{}} handleAddScript={handleAddScript}/>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
            </Grid>
            
        </>
    );
}