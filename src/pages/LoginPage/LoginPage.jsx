import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';
import { Grid, Header, Form, Button, Segment } from 'semantic-ui-react';

export default function LoginPage(props){
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [invalidForm, setInvalidForm] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await userService.login(form);
      props.handleSignUpOrLogin();
      history.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  }
  //TODO: update labels to form attribute instead of html element
  return (
    <>
      <Grid textAlign='center' style={{ height: '85vh', marginTop:'-60px'}} verticalAlign='middle'>
        <Grid.Column width={4}>
          <Header as="h2">Log In</Header>
          <Form autoComplete='off' onSubmit={handleSubmit}>
            <Segment>
              <label htmlFor="username">Username</label>
              <Form.Input
                id="username"
                name="username"
                placeholder="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <label htmlFor="password">Password</label>
              <Form.Input
                id="password"
                name="password"
                placeholder="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                required
              />
              <Button type='submit' className='btn' disabled={invalidForm}>Log In</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  )
    
}

