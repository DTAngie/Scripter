import { PromiseProvider } from 'mongoose';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Segment, Select } from 'semantic-ui-react';

export default function  NewScriptForm(props){
    const [form, setForm] = useState({
        title: '',
        logline: '',
        synopsis: '',
        genre: '',
        mediaType: '',
        stage: '',
        budget: '',
    });
    const history = useHistory();
  
    const genres = [
        { key: '0', text: 'Action', value: 'Action' },
        { key: '1', text: 'Adventure', value: 'Adventure' },
        { key: '2', text: 'Animation', value: 'Animation' },
        { key: '3', text: 'Biography', value: 'Biography' },
        { key: '4', text: 'Comedy', value: 'Comedy' },
        { key: '5', text: 'Crime', value: 'Crime' },
        { key: '6', text: 'Drama', value: 'Drama' },
        { key: '7', text: 'Family', value: 'Family' },
        { key: '8', text: 'Fantasy', value: 'Fantasy' },
        { key: '9', text: 'Film Noir', value: 'Film Noir' },
        { key: '10', text: 'History', value: 'History' },
        { key: '11', text: 'Horror', value: 'Horror' },
        { key: '12', text: 'Musical', value: 'Musical' },
        { key: '13', text: 'Mystery', value: 'Mystery' },
        { key: '14', text: 'Romance', value: 'Romance' },
        { key: '15', text: 'Sci-Fi', value: 'Sci-Fi' },
        { key: '16', text: 'Sport', value: 'Sport' },
        { key: '17', text: 'Superhero', value: 'Superhero' },
        { key: '18', text: 'Thriller', value: 'Thriller' },
        { key: '19', text: 'War', value: 'War' },
        { key: '20', text: 'Western', value: 'Western' }
    ];

    const mediaTypes = [
        { key: '0', text: 'Feature', value: 'Feature' },
        { key: '1', text: 'New Media', value: 'New Media' },
        { key: '2', text: 'Short', value: 'Short'},
        { key: '3', text: 'Television', value: 'Television' },
        { key: '4', text: 'Web', value: 'Web' },
    ]

    const stages = [
        { key: '0', text: 'Draft', value: 'Draft' },
        { key: '1', text: 'Pitch', value: 'Pitch' },
        { key: '2', text: 'Optioned', value: 'Optioned' },
        { key: '3', text: 'Produced', value: 'Produced' },
    ]

    const budgets = [
        { key: '0', text: 'Under $100K', value: '1' },
        { key: '1', text: '$100K - $250K', value: '2' },
        { key: '2', text: '$250K - $500K', value: '3' },
        { key: '3', text: '$500K - $1M', value: '4' },
        { key: '4', text: '$1M - $5M', value: '5' },
        { key: '5', text: '$5M - $10M', value: '6' },
        { key: '6', text: 'Above $10M', value: '7' }
    ]


    function handleChange(e, {name, value}){
        setForm({
            ...form,
            [name]: value
        });
    }



    function handleSubmit(e){
        e.preventDefault();
        props.handleAddScript(form);
    }


    return (
        <Form autoComplete='off' onSubmit={handleSubmit}>
            <Segment>
                <Form.Input
                    name="title"
                    id="title"
                    onChange={handleChange}
                    placeholder="title"
                    value={form.title}
                    label="Title"
                    required
                />
                <Form.Input
                    name="logline"
                    id="logline"
                    onChange={handleChange}
                    placeholder="logline"
                    value={form.logline}
                    label="Logline"
                />
                <Form.Input
                    name="synopsis"
                    id="synopsis"
                    onChange={handleChange}
                    placeholder="synopsis"
                    value={form.synopsis}
                    label="Synopsis"
                />
                <Form.Select
                    name="genre"
                    id="genre"
                    options={genres}
                    onChange={handleChange}
                    value={form.genre}
                    label="Genre"                
                />
                <Form.Select
                    name="mediaType"
                    id="mediaType"
                    options={mediaTypes}
                    onChange={handleChange}
                    value={form.mediaType}
                    label="Medium"
                />
                <Form.Select
                    name="stage"
                    id="stage"
                    options={stages}
                    onChange={handleChange}
                    value={form.stage}
                    label="Script Stage"
                />
                <Form.Select
                    name="budget"
                    id="budget"
                    options={budgets}
                    onChange={handleChange}
                    value={form.budget}
                    label="Estimated Budget"
                />    
            <Button>Add Script</Button>
            </Segment>
        </Form>
    );
}