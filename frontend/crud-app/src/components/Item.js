import { useState, useEffect, useContext, createContext } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

import { IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Item() {
    const { isVerified } = useContext(AppContext);
    const { item_id } = useParams();

    const [item, setItem] = useState(null);
    const [editMode, setEditMode] = useState(false);

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

    const handleEdit = () => {
        setEditMode(true);
        console.log(editMode);
    }

    const handleSubmitChanges = () => {
        setEditMode(false);
        console.log(editMode);
    }

    if (item === null) {
        return <p>Loading...</p>;
    }

    return (
        <ItemWrapper>
            <ItemContainer>
                {isVerified ?
                    <ButtonContainer>
                        <IconButton aria-label="Edit" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </ButtonContainer>
                    :
                    <></>
                }
                {!editMode ? 
                <h1>{item[0].item_name}</h1>
                :
                <input type='text' id='itemName' defaultValue={item[0].item_name}></input>
                }
                <h3>Description:</h3>
                {!editMode ? 
                <p>{item[0].description}</p>
                :
                <input type='text' id='itemDescription' defaultValue={item[0].description}></input>
                }
                <h3>Quantity: </h3>
                {!editMode ? 
                <p>{item[0].quantity}</p>
                :
                <input type='text' id='itemQuantity' defaultValue={item[0].quantity}></input>
                }
                <h3>Last edited by: </h3>
                <p>{item[0].user_name}</p>
                {!editMode ? 
                <></>
                :
                <Button id="submitChangesButton" style={styledButton} variant="contained" onClick={handleSubmitChanges}>Submit Changes</Button>
                }
            </ItemContainer>
        </ItemWrapper>
    )
}

const styledButton = {
    border: "2px solid #ffffff",
    backgroundColor: "#0844f4",
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