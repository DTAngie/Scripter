import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptDetail from '../../components/ScriptDetail/ScriptDetail';
import * as scriptAPI from '../../utils/scriptService';

export default function ScriptDetailPage(){
    const [script, setScript] = useState({});
    const [displayBudget, setDisplayBudget] = useState('');
    
    const budgets = {
        '1': 'Under $100K',
        '2': '$100K - $250K',
        '3': '$250K - $500K',
        '4': '$500K - $1M',
        '5': '$1M - $5M',
        '6': '$5M - $10M',
        '7': 'Above $10M'
    }
       
    const location = useLocation();

    async function getScript(){
        const scriptID = location.state.id;
        try {
            const data = await scriptAPI.getOne(scriptID);
            setScript(data.script);
        } catch(err) {
            console.log(err);
        }
    }
    
    function handleDeleteScript(id) {
        console.log(id);
    }

    
    function getBudget(){
        setDisplayBudget(budgets[script.budget]);
    }

    useEffect(() => {
        getScript()
    }, []);

    useEffect(()=> {
        getBudget();
    }, [script]);

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation ownerIndex={script.author}/>
                </Grid.Column>
                <Grid.Column width={8}>
                <ScriptDetail script={script} displayBudget={displayBudget} handleDeleteScript={handleDeleteScript}/>
                </Grid.Column>
                <Grid.Column width={4}>
                    Side Content
                </Grid.Column>
            </Grid>
        </>
    );
}