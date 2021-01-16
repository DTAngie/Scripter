import React from 'react';
import GuestHeader from '../../components/GuestHeader/GuestHeader';
import PageHeader from '../../components/Header/Header';

export default function HomePage({user, handleLogout}) {
    return (
        <>
        <PageHeader isLoggedIn={user ? true : false} handleLogout={handleLogout} />
        <h1>This is the home page!</h1>
        </>
    )
}