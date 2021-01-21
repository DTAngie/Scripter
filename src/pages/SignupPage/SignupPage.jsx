import React, {useState, useRef, useEffect } from 'react';
import './SignupPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';
import PageHeader from '../../components/Header/Header';
import { Grid, Header, Form, Button, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function SignUpPage(props){
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: ''
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
    const formData = new FormData();

    for (let val in form) {
      formData.append(val, form[val])
    }
    try {
      await userService.signup(form);
      props.handleSignUpOrLogin();
      history.push('/dashboard');
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }
//TODO: update labels to form attribute instead of html element
  return (
    <>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column width={4}>
          <Header as="h2">Sign up</Header>
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
              <label htmlFor="email">Email</label>
              <Form.Input
                id="email"
                name="email"
                placeholder="email"
                value={form.email}
                onChange={handleChange}
                type="email"
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
              <label htmlFor="passwordConf">Enter Password Again</label>
              <Form.Input
                id="passwordConf"
                name="passwordConf"
                placeholder="password"
                value={form.passwordConf}
                onChange={handleChange}
                type="password"
                required
              />
              <Button type='submit' className='btn' disabled={invalidForm}>Get Started</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      <div>Sign up page</div>
    </>
  );
}
