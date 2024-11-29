# Frontend for E-commerce Platform

This project represents the frontend of an e-commerce platform, built using React and TypeScript, and interacting with the backend through Axios.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Axios**: To make HTTP requests to the backend.
- **React Router**: For navigation and routing.
- **Sass (SCSS)**: Used for styling the components.

## Prerequisites

To run the frontend locally, you will need:

- **Node.js** v14+ and **npm** (or **yarn**)

## Setting Up the Project

1. Clone this repository:

    ```bash
    git clone https://github.com/EneCatalinM/ecommerce-frontend
    cd ecommerce-frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

The application should be available at `http://localhost:3000`.

- ADMIN ACCOUNT:
  ```bash
  cata@yahoo.com
  strongpassword
  ```
## Useful Commands

- **Development**: `npm start`
- **Production Build**: `npm run build`
- **Testing**: `npm test`

## Project Structure

- `src/` - Contains the main source code.
  - `src/components/` - Reusable UI components like buttons, cards, forms, etc.
  - `src/pages/` - Individual pages like ProductCatalog, Checkout, Dashboard, etc.
  - `src/services/` - Contains API services, using Axios to interact with the backend.
  - `src/context/` - Context providers for global state management (e.g., Cart, Auth).

## Features

- **User Authentication**: Login and registration.
- **Product Catalog**: Display a list of products, including search and filter functionality.
- **Cart Management**: Add, update, or remove products from the cart.
- **User Dashboard**: View orders and manage user details.
- **Admin Features**: Add or delete products, manage users, and view all orders.