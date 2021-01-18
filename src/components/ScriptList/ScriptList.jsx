import React from 'react';

export default function ScriptList({scripts}){
    return (
        <>
        {scripts.map((s ) => {
            return (<span key={s._id}>{s.title}</span> );
        })
    }
        </>
    );
}
