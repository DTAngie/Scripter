import React, { useState, useEffect } from 'react';
import { Segment, Header, Divider } from 'semantic-ui-react';


export default function ScriptDetail({script, displayBudget}) {

    return (
        <Segment>
            <Header>
                {script.title}
            </Header>
            <p>{script.logline}</p>
            <Divider></Divider>
            <p>{script.synopsis}</p>
            <Divider></Divider>
            <Segment.Group horizontal>
                <Segment>Medium: {script.mediaType}</Segment>
                <Segment>Genre: {script.genre}</Segment>
            </Segment.Group>
            <Segment.Group horizontal>
                <Segment>Stage: {script.stage}</Segment>
                <Segment>Budget: {displayBudget}</Segment>
            </Segment.Group>
        </Segment>
    )
}