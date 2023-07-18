import { useState, useEffect, useContext, createContext } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

export default function Item() {
    const { testStr } = useContext(AppContext);
    return (
        <>
            <h1>This is the Item Component!</h1>
            { testStr}
        </>
    )
}