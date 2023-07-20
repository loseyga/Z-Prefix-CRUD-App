import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { AppContext } from '../App'

import { Button } from '@mui/material';

export default function Create() {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    const handleSubmitChanges = async () => {
        let itemName = document.getElementById('itemName').value;
        let description = document.getElementById('description').value;
        let quantity = document.getElementById('quantity').value;

        try {
            await handleCreate(itemName, description, quantity);
            navigate('/inventory');
        } catch (err) {
            window.alert(err.message);
        }
    }

    const handleCreate = (itemName, description, quantity) => {
        return fetch('http://localhost:3001/items',{
            method:"POST",
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

    return (
        <ItemWrapper>
            <ItemContainer>
                <InfoContainer>
                    <ItemNameInput type='text' id='itemName' rows="1" placeholder='Enter item name'></ItemNameInput>
                    <h3>Description:</h3>
                    <ItemInfoInput type='text' id='description' rows="4" placeholder='Enter item description'></ItemInfoInput>
                    <h3>Quantity:</h3>
                    <ItemQuantityInput type='number' id='quantity' placeholder='Enter item quantity'></ItemQuantityInput>
                </InfoContainer>
                <Button id="submitChangesButton" style={styledButton} variant="contained" onClick={handleSubmitChanges}>Create Item</Button>
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
const InfoContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
width: 100%;
height: 80%;
`
const ItemNameInput = styled.textarea`
font-family: roboto;
font-size: xx-large;
font-weight: 700;
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