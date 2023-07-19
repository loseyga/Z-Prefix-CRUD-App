import { useState, useEffect, useContext, createContext } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Item() {
    const { isVerified } = useContext(AppContext);
    const { item_id } = useParams();

    const [item, setItem] = useState(null);

    useEffect(() => {
        fetchItem();
    }, []);

    const fetchItem = async () => {
        try {
            console.log(item_id);
            const response = await fetch(`http://localhost:3001/items/${item_id}`);
            const data = await response.json();
            setItem(data);
        } catch (error) {
            console.error('Error fetching the item', error);
        }
    };

    if (item === null) {
        return <p>Loading...</p>;
    }

    return (
        <ItemWrapper>
            <ItemContainer>
                {isVerified ?
                    <ButtonContainer>
                        <IconButton aria-label="Edit">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </ButtonContainer>
                    :
                    <></>
                }
                <h1>{item[0].item_name}</h1>
                <h3>Description: {item[0].description}</h3>
                <h3>Quantity: {item[0].quantity}</h3>
                <h3>Last edited by: {item[0].user_name}</h3>
            </ItemContainer>
        </ItemWrapper>
    )
}

const ItemWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`
const ItemContainer = styled.div`
display: flex;
flex-direction: column;
width: 50%;
height: 90%;
min-width: 400px;
padding: 10px;
border-radius: 10px;
border: 4px solid #0844f4;
`
const ButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
width: 100%;
`