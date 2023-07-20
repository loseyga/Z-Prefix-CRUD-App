import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../App'
import styled from 'styled-components';

import { Box, Button, List, ListItem, ListItemText, IconButton, FormHelperText, OutlinedInput, InputAdornment, ToggleButton, ToggleButtonGroup } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import BackspaceIcon from '@mui/icons-material/Backspace';

export default function Inventory() {
    const navigate = useNavigate();
    const { isVerified, user } = useContext(AppContext);

    const [inventory, setInventory] = useState([]);
    const [myInventory, setMyInventory] = useState([]);
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [alignment, setAlignment] = useState('myInventory');

    useEffect(() => {
        fetchInventory();
    }, []);

    useEffect(() => {
        fetchMyInventory();
    }, [inventory]);
    
    useEffect(() => {
        searchInventory();
    }, [ searchTerm ]);

    useEffect(() => {
        setInventoryResults();
    }, [alignment]);

    const fetchInventory = async () => {
        try {
            const response = await fetch('http://localhost:3001/inventory');
            const data = await response.json();
            setInventory(data);
        } catch (error) {
            console.error('Error fetching inventory', error);
        }
    };

    const fetchMyInventory = async () => {
        if (isVerified) {
            try {
                const response = await fetch(`http://localhost:3001/items?user_account_id=${user}`);
                const data = await response.json();
                setMyInventory(data);
                setResults(data);
            } catch (error) {
                console.error('Error fetching inventory', error);
            }
        } else {
            setResults(inventory);
        }
    };

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const setInventoryResults = () => {
        if (alignment === 'myInventory') {
            setResults(myInventory);
        } else {
            setResults(inventory);
        }
    };

    const searchInventory = () => {
        let searchResults = [...results];
        if (searchTerm) {
        searchResults = searchResults.filter(item => item.item_name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setResults(searchResults);
    };

    const handleFormSubmit = e => {
        e.preventDefault();
        let searchInput = document.getElementById('searchInput').value;
        setSearchTerm(searchInput);
    };

    const handleSearch = () => {
        let searchInput = document.getElementById('searchInput').value;
        setSearchTerm(searchInput);
    }

    const handleClear = () => {
        document.getElementById('searchInput').value = '';
        handleSearch();
    }

    function MyFormHelperText() {
        const { focused } = useFormControl() || {};
        const helperText = React.useMemo(() => {
        if (focused) {
            return 'Press the enter key or click on the search icon to submit search';
        }
        return 'Search for a specific item';
        }, [focused]);
        return <FormHelperText style={CenterItems}>{helperText}</FormHelperText>;
    }

    return (
        <InventoryWrapper>
            <ResultsContainer>
            {isVerified ?
                    <ButtonContainer>
                            <ToggleButtonGroup
                            color="primary"
                            value={alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                            >
                                <ToggleButton value="inventory">Full Inventory</ToggleButton>
                                <ToggleButton value="myInventory">My Inventory</ToggleButton>
                            </ToggleButtonGroup>
                            <Button id="addItemButton" style={styledButton} variant="contained" onClick={() => navigate(`/create`)}>Add a New Inventory Item</Button>
                    </ButtonContainer>
                    :
                    <></>
                }
                <Box component="form" noValidate autoComplete="off" style={CenterItems} onSubmit={handleFormSubmit}>
                    <FormControl sx={{ width: '100%' }}>
                        <OutlinedInput
                        id = "searchInput"
                        placeholder="Please enter text"
                        startAdornment={
                            <InputAdornment position="start">
                                <IconButton
                                onClick={handleClear}
                                id="backspaceIconButton"
                                edge="start"
                                >
                                    <BackspaceIcon />
                                </IconButton>
                            </InputAdornment>
                            }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={handleSearch}
                                id="searchIconButton"
                                edge="end"
                                >
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                            } 
                        />
                        <MyFormHelperText />
                    </FormControl>
                </Box>
                <ListContainer>
                    <List sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
                        {results.map((item, index) => (
                            <ListItem
                            key={index}
                            disableGutters
                            secondaryAction={
                                <Link to={`/inventory/${item.id}`}>
                                    <IconButton aria-label="info">
                                    <InfoIcon />
                                    </IconButton>
                                </Link>
                            }
                            >
                            <ListItemText 
                            primary={item.item_name}
                            secondary={item.description.length > 100 ? `${item.description.slice(0, 100)}...` : item.description}
                            />
                            </ListItem>
                        ))}
                    </List>
                </ListContainer>
            </ResultsContainer>
        </InventoryWrapper>
    )
}

const CenterItems = {
    display: "flex",
    justifyContent: "center",
}

const styledButton = {
    border: "2px solid #ffffff",
    backgroundColor: "#0844f4",
}

const ListContainer = styled.div`
flex-grow: 1;
overflow: auto;
`;

const InventoryWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
`
const ResultsContainer = styled.div`
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
justify-content: space-between;
width: 100%;
`