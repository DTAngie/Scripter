import React from 'react';
import GuestHeader from '../../components/GuestHeader/GuestHeader';

export default function HomePage({user}) {
    return (
        <>
        <GuestHeader />
        <h1>This is the home page!</h1>
        </>
    )
}