import React, { useState } from 'react';
import { Segment, Grid, Button, Header, Loader } from 'semantic-ui-react';
import './IdeaGenerator.css';
import * as scriptAPI from '../../utils/scriptService';

export default function IdeaGenerator(){
    const [script1, setScript1] = useState({});
    const [script2, setScript2] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [noScriptsMessage, setNoScriptsMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const searchTerms = [
        'man', 'woman', 'girl', 'boy', 'play', 'table', 'letter', 'funny', 'year', 'legal', 'lawyer', 'saw',
        'one', 'two', 'three', 'four', 'five', 'joke', 'stand', 'kiss', 'you', 'this', 'that',
        'book', 'ice', 'fire', 'love', 'hate', 'fair', 'anger', 'many', 'week', 'month', 'letter', 'music',
    ]


    async function getRandomScript(scriptNumber, currentTry){
        if (currentTry >= 5 ){ //Prevents infinite loops
            return false;
        }
        //Generate random word
        const randomWord = searchTerms[Math.floor(Math.random() * searchTerms.length)];
        const data = await scriptAPI.getIdeas(randomWord);
        if (data.Response === "False") {
            //If no results, try again
            getRandomScript(scriptNumber, currentTry+1);
        } else {
            //Get random movie from results array
            const selectedResult = data.Search[Math.floor(Math.random()*data.Search.length)];
            //Get movie info from api
            const movie = await scriptAPI.getMovie(selectedResult.imdbID);
            //Check to make sure result is usable
            if((movie.Language.includes('English')) && (movie.Plot !== "N/A" && movie.Plot !== "")){
                return {
                    title: movie.Title,
                    plot: movie.Plot,
                    actor: movie.Actors.substr(0, movie.Actors.indexOf(',')),  
                };
            } else {
                getRandomScript(scriptNumber, currentTry+1);
            }
        }
    }

    async function handleClick(e){
        e.preventDefault();
        setIsLoading(true);
        setIsLoaded(false);
        setScript1({});
        setScript2({});
        //To prevent infinite loops, use the tries state to terminate;
        
        //Get First film
        const data1 = await getRandomScript('script1', 0);
        if (!data1) {
            setIsLoading(false);
            return setNoScriptsMessage('Writer\'s Block! Try Again');
        }
        //Get Second Film
        const data2 = await getRandomScript('script2', 0);
        if(!data2) {
            setIsLoading(false);
            return setNoScriptsMessage('Writer\'s Block! Try Again');
        }
        setScript1(data1);
        setScript2(data2);
        setNoScriptsMessage('');
        setIsLoaded(true);
        setIsLoading(false);
    }
    
    return (
        <Segment className="IdeaGenerator">
            { isLoaded ? 
                <Grid id="idea-grid">
                    <Grid.Row>
                        <Grid.Column width={6} className="idea">
                            <Header>{script1.title}</Header>
                            {script1.plot}
                        </Grid.Column>
                        <Grid.Column verticalAlign='middle' width={4} className="meets">
                            <p>Meets</p>
                        </Grid.Column>
                        <Grid.Column width={6} className="idea">
                            <Header>{script2.title}</Header>
                            {script2.plot}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <p><b>Here's some cast ideas:</b></p>
                            <p>{script1.actor} and {script2.actor}</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            :
            ''
        }
            <>
            <p>{noScriptsMessage}</p>
            <Loader active={isLoading} inline="centered">Please Wait...</Loader>
            <p>Having Writer's block? Let the idea generator help you!</p>
                <Button onClick={handleClick}>Generate Ideas</Button>
            </>
        </Segment>
    )
}