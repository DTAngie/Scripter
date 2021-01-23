import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Divider, Button, Modal, Grid } from 'semantic-ui-react';
import ScriptRating from '../ScriptRating/ScriptRating';

export default function ScriptDetail({isOwner, script, userRating, displayBudget, handleDeleteScript, handleRate}) {
    const averageRatingDisplay = convertScoreToText();
    
    function convertScoreToText() {
        switch(script.averageRating) {
            case 1:
                return "Pass";
            case 2:
                return "Consider";
            case 3:
                return "Purchase";
            default:
                return "Unrated";
        }
    }

    return (       
        <Segment>
            <Header>
                {script.title}
            </Header>
            <p>{averageRatingDisplay}</p>
            <p>{script.logline}</p>
            <Divider></Divider>
            <p>{script.synopsis}</p>
            <Divider></Divider>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column >
                    Medium: {script.mediaType}
                    </Grid.Column>
                    <Grid.Column>
                    Genre: {script.genre}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                    Stage: {script.stage}
                    </Grid.Column>
                    <Grid.Column>
                    Budget: {displayBudget}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            { isOwner ?
                <>
                    <Button as={Link} to={`/scripts/${script._id}/edit`} floated='left' content='Edit' labelPosition='left' icon='pencil' />
                    <Modal 
                        trigger= {
                            <Button color='red' floated='right' content='Delete' labelPosition='left' icon='delete' />
                        }
                    >
                        <Modal.Header>Delete Script</Modal.Header>
                        <Modal.Content>Are you sure you want to delete this script? This action cannot be undone.</Modal.Content>
                        <Modal.Actions>
                            <Button>No</Button>
                            <Button color='red' onClick={()=> handleDeleteScript(script._id)}>Yes, Delete</Button>
                        </Modal.Actions>
                    </Modal>
                    <div style={{clear:"both"}}></div>
                </>
                :
                <>
                {/* Rating */}
                <Grid>
                    <Grid.Column width={8}>
                        <ScriptRating userRating={userRating} handleRate={handleRate} convertScore={convertScoreToText}/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <p>Script by <Link to={`/author/${script.author._id}`}>{script.author.username}</Link></p>
                    </Grid.Column>
                </Grid>
                </>
            }
        </Segment>
    )
}