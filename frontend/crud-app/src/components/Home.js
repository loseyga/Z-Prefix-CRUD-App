import { Link } from 'react-router-dom'
import styled from 'styled-components';

export default function Home() {
    return (
        <HomeWrapper>
            <WelcomeWrapper>
                <WelcomeTitle>Welcome to StockSense! </WelcomeTitle>
                <WelcomeInfo>
                    <p>
                        StockSense is an intuitive and user-friendly inventory management 
                        app designed to help users effortlessly keep track of their items. 
                        With StockSense, users can easily add items to their inventory list, 
                        view existing items, and stay informed about their stock levels at a glance. 
                        The app is designed to streamline inventory management, making it ideal for 
                        individuals, businesses, and organizations of all sizes.
                    </p>
                    <p>
                        If you are an inventory manager and would like to add a new inventory
                        item, or you would like to edit an existing inventory item, please sign in by 
                        clicking to sign in button in the header.
                    </p>
                    <p>
                        If you are a visitor and would just like to view the existing inventory,
                        you can continue to the inventory list by clicking <Link to="/inventory">here</Link>.
                    </p>
                    <p>
                        If you ever want to return to this page, you can click the StockSense
                        icon in the left of the header.
                    </p>
                    <p>Thank you for using StockSense, enjoy!</p>
                </WelcomeInfo>
            </WelcomeWrapper>
        </HomeWrapper>
    )
}

const HomeWrapper=styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100%;
`
const WelcomeWrapper=styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
background-color: white;
height: 75%;
width: 40%;
min-width: 400px;
padding: 10px;
border-radius: 10px;
border: 4px solid #0844f4;
`
const WelcomeTitle=styled.div`
padding: 10px;
background-color: #c2e6ff;
border: 2px solid #dff2ff;
border-radius: 10px;
font-size: xx-large;
font-weight: 800;
`
const WelcomeInfo=styled.div`
padding: 10px;
overflow: auto;
background-color: #dff2ff;
border: 2px solid #c2e6ff;
border-radius: 10px;
`