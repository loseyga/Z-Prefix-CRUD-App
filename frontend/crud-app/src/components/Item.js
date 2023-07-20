import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

import { IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Item() {
    const { isVerified, user, userName } = useContext(AppContext);
    const { item_id } = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchItem();
    }, []);

    const fetchItem = async () => {
        try {
            const response = await fetch(`http://localhost:3001/items/${item_id}`);
            const data = await response.json();
            setItem(data);
        } catch (error) {
            console.error('Error fetching the item', error);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    }

    const handleCancel = () => {
        setEditMode(false);
    }

    const handleClickDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3001/items/${item_id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                navigate('/inventory');
            } else {
                const data = await response.json();
                throw new Error(data.error);
            }
        } catch (err) {
            window.alert(err.message);
        }
    }

    const handleSubmitChanges = async () => {
        let itemName = document.getElementById('itemName').value;
        let description = document.getElementById('description').value;
        let quantity = document.getElementById('quantity').value;

        try {
            await handlePatch(itemName, description, quantity);
            await fetchItem();
            setEditMode(false);
        } catch (err) {
            window.alert(err.message);
        }
    }

    const handlePatch = (itemName, description, quantity) => {
        return fetch(`http://localhost:3001/items/${item_id}`,{
            method:"PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "user_account_id": user, "item_name": itemName, "description": description, "quantity": quantity })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => { throw new Error(data.error) });
                }
            })
            .catch(err => {
                window.alert(err.message);
            });
    }
    

    if (item === null) {
        return <p>Loading...</p>;
    }

    return (
        <ItemWrapper>
            <ItemContainer>
                <InfoContainer>
                    {userName === item[0].user_name ?
                        <ButtonContainer>
                            {editMode ? 
                                <IconButton aria-label="Cancel" onClick={handleCancel}>
                                    <CancelIcon />
                                </IconButton>
                                :
                                <></>
                            }
                            <IconButton aria-label="Edit" onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="Delete" onClick={handleClickDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </ButtonContainer>
                        :
                        <></>
                    }
                    {!editMode ? 
                    <ItemName>{item[0].item_name}</ItemName>
                    :
                    <ItemNameInput type='text' id='itemName' rows="1" defaultValue={item[0].item_name}></ItemNameInput>
                    }
                    <h3>Description:</h3>
                    {!editMode ? 
                    <ItemInfo>{item[0].description}</ItemInfo>
                    :
                    <ItemInfoInput type='text' id='description' rows="4" defaultValue={item[0].description}></ItemInfoInput>
                    }
                    <h3>Quantity: </h3>
                    {!editMode ? 
                    <ItemInfo>{item[0].quantity}</ItemInfo>
                    :
                    <ItemQuantityInput type='number' id='quantity' defaultValue={item[0].quantity}></ItemQuantityInput>
                    }
                    <h3>Created by: </h3>
                    <ItemInfo>{item[0].user_name}</ItemInfo>
                </InfoContainer>
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
align-items: space-between;
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
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
width: 100%;
height: 80%;
`
const ItemName = styled.span`
font-size: xx-large;
font-weight: 700;
`
const ItemNameInput = styled.textarea`
font-family: roboto;
font-size: xx-large;
font-weight: 700;
`
const ItemInfo = styled.span`
font-size: large;
font-weight: 500;
max-height: 100px;
overflow: auto;
`
const ItemInfoInput = styled.textarea`
font-family: roboto;
font-size: large;
font-weight: 500;
`
const ItemQuantityInput = styled.input`
font-family: roboto;
font-size: large;
font-weight: 500;
`