import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../store';
import { useSignupMutation } from '../hooks/userHooks';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { ApiError } from '../types/ApiError';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { UserInfo } from '../types/UserInfo';

const SignupPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const { mutateAsync: signup, isLoading } = useSignupMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const data = await signup({
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (error) {
      toast.error(getError(error as ApiError));
    }
  };

  return (
    <Container className='small-container'>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <h1 className='my-3'>Sign up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            required
            type='text'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            required
            type='email'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            required
            type='password'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirm-password'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            type='password'
          />
        </Form.Group>
        <div className='mb-3'>
          <Button type='submit'>Sign up</Button>
        </div>
        <div className='mb-3'>
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SignupPage;
