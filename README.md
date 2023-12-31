# StockSense Application

StockSense is an intuitive and user-friendly inventory management app designed to help users effortlessly keep track of their items. With StockSense, users can easily add items to their inventory list, view existing items, and stay informed about their stock levels at a glance. The app is designed to streamline inventory management, making it ideal for individuals, businesses, and organizations of all sizes.

## Table of Contents
1. [Getting Started](#getting-started)
2. [User Stories](#user-stories)
3. [Features](#features)
4. [Usage](#usage)
5. [Screen-Shots](#screen-shots)
6. [Technologies Used](#technologies-used)
7. [Contact](#contact)

## Getting Started
To use the StockSense Application, you can follow the steps below to run the application locally:

1. Clone this repository to your local machine.
2. Build all service images and containers using the command: `docker-compose up -d` (this should install all dependencies and start the frontend, server, and database containers; to ensure the containers are running, use the command: `docker ps -a`; if a container is stopped, use the command: `docker run <container_name>`)
3. Access the application in your web browser by visiting `http://localhost:3000`.
(When you are finished utilizing the application, you can uninstall all containers and images by running: `docker-compose down --rmi all`)

## User Stories
The StockSense Application fulfills the following user stories:

1. As an inventory manager, I want to be able to create an account so that I can track my inventory.
2. As an inventory manager, I want to be able to log into my account so that I can see my inventory of items.
3. After logging in, the inventory manager should be redirected to their inventory of items.
4. As an inventory manager, I want to be able to create a new item so that I can share my item details with the world.
5. After the item is created, the inventory manager should be redirected to their inventory of items.
6. An item displays name, description, and quantity.
7. As an inventory manager, I want to be able to see my entire inventory of items.
8. The inventory of items should display the first 100 characters of each item description, with "..." at the end if the description is longer than 100 characters.
9. As an inventory manager, I want to be able to see any individual item I have added.
10. The full item information should be displayed.
11. As an inventory manager, I want to be able to edit an item so that I can fix any mistakes I made creating it.
12. When the user toggles edit mode, the page remains the same and the fields become editable.
13. As an inventory manager, I want to be able to delete an item so that I can remove any unwanted content.
14. When the user deletes the item, they should be redirected to their inventory of items.
15. As a visitor who is not logged in, I want to be able to view all items created by every inventory manager so that I can browse every item.
16. Unauthenticated users should be able to view all items and any single item.
17. The items should only display the first 100 characters of their description with "..." at the end if it is longer than 100 characters.

## Features
The StockSense Application offers the following features:

1. User account creation and login functionality.
2. Creation, editing, and deletion of inventory items.
3. Display of inventory items, showing the first 100 characters of the description.
4. Access to view any individual item in full detail, including name, description, and quantity.
5. Edit mode for verified users on their created inventory items, allowing for easy corrections.
6. Public access for unauthenticated users to view all items created by every inventory manager.

## Usage
1. Register a new account or log in with existing credentials to access your inventory dashboard.
2. On the dashboard, you can view your existing items and create new items using the "Add Item" button.
3. To edit an item, click on the edit icon to enter edit mode.
4. To delete an item, click on the delete icon.
5. As an unauthenticated user, you can freely browse all inventory items.

## Screen-Shots
![home](/Screen-Shots/Home.png?raw=true "Home Page")

![create account](/Screen-Shots/Create_Account.png?raw=true "Create Account Page")

![sign in](/Screen-Shots/Sign-In.png?raw=true "Sign In Page")

![visitor inventory](/Screen-Shots/Visitor_Inventory.png?raw=true "Visitor Inventory Page")

![manager inventory](/Screen-Shots/Manager_Inventory.png?raw=true "Manager Inventory Page")

![visitor item](/Screen-Shots/Visitor_Item.png?raw=true "Visitor Item Page")

![manager item](/Screen-Shots/Manager_Item.png?raw=true "Manager Item Page")

![edit item](/Screen-Shots/Edit_Item.png?raw=true "Edit Item Page")

![create item](/Screen-Shots/Create_Item.png?raw=true "Create Item Page")

## Technologies Used
The StockSense Application is built using the following technologies:

- Frontend: React.js, HTML, CSS
- Backend: Node.js, Express.js
- Database: Postgres
- Deployment: Docker

## Contact
If you have any questions or need further assistance, you can reach out to the development team at loseyga@gmail.com.

Thank you for using the StockSense Application! Happy managing!