import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';
import './ScriptList.css';

export default function ScriptList({scripts}){
    return (
        <>
            <Card.Group className="ScriptList">
            {scripts.map((s ) => {
                return (
                    <Link key={s._id} to={`/script/${s._id}`}>
                        <Card >
                            <Card.Content>
                            <Card.Header>{s.title}</Card.Header>
                            <Card.Description>{s.logline}</Card.Description>
                            <Card.Description>{s.synopsis}</Card.Description>
                        </Card.Content>
                        </Card>
                    </Link>
                );
            })}
            </Card.Group>
        </>
    );
}
