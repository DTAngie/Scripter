import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import BrowseScripts from '../../components/BrowseScripts/BrowseScripts';
import LeftNavigation from '../../components/LeftNavigation/LeftNavigation';
import ScriptDetail from '../../components/ScriptDetail/ScriptDetail';
import * as scriptAPI from '../../utils/scriptService';
import * as ratingAPI from '../../utils/ratingsService';

export default function ScriptDetailPage({user}){
    const [script, setScript] = useState({});
    const [userRating, setRating] = useState(null);
    const [displayBudget, setDisplayBudget] = useState('');
    const [isOwner, setOwner] = useState(false);
    const params = useParams();

    const budgets = {
        '0': 'Under $100K',
        '1': '$100K - $250K',
        '2': '$250K - $500K',
        '3': '$500K - $1M',
        '4': '$1M - $5M',
        '5': '$5M - $10M',
        '6': 'Above $10M'
    }
       
    const location = useLocation();
    const history = useHistory();

    async function getScript(){
        const scriptID = params.id;
        try {
            const data = await scriptAPI.getOne(scriptID);
            setScript(data.script);
        } catch(err) {
            console.log(err);
        }
    }
    
    async function handleDeleteScript(scriptID) {
        try {
            await scriptAPI.deleteOne(scriptID);
            history.push('/dashboard');
        } catch(err) {
            console.log(err);
        }
    }
    
    async function handleRating(rating){
        console.log(rating)
        if(userRating) {
            try{
                console.log('remove the rating')
                // const data = await ratingAPI.
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('add this rating');
            const newRating = await ratingAPI.create(rating, script._id);
            setRating(newRating);
        }
    }
    
    function getBudget(){
        setDisplayBudget(budgets[script.budget]);
    }
//This gets user's specific rating for said script
    async function getRatings() {
        const data = await ratingAPI.getOne(script._id, user._id);
        setRating(data.rating);
    }

    function checkOwner(){
        if(script.author) {
            setOwner((user._id.toString() === script.author._id.toString()) ? true: false);
        }
    }


    useEffect(() => {
        getScript();
    }, [location]);

    useEffect(()=> {
        getBudget();
        getRatings();
        checkOwner();
    }, [script]);

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <LeftNavigation ownerIndex={script.author}/>
                </Grid.Column>
                <Grid.Column width={8}>
                {Object.keys(script).length > 0 ?
                    <ScriptDetail
                        isOwner={isOwner}
                        script={script}
                        userRating={userRating}
                        displayBudget={displayBudget}
                        handleDeleteScript={handleDeleteScript}
                        handleRating={handleRating}
                    />
                    :
                    <p>Loading</p>
                    //TODO: Add in a loading icon. Use this ternary on other pages as well.     
                }
                </Grid.Column>
                <Grid.Column width={4}>
                    <BrowseScripts />
                </Grid.Column>
            </Grid>
        </>
    );
}