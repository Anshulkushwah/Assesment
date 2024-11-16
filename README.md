Install dependencies for both frontend and backend:

cd frontend / my project
npm install

cd backend
npm install

cd frontend
npm run start

Frontend will run on http://localhost:3000 Backend will run on http://localhost:4000


Database Configuration:

Ensure you have your MongoDB setup.

Create a .env file in the root of your backend directory.

Add your MongoDB URI in the .env file as follows:

bash
MONGO_URI=your_mongodb_uri
Attach the Test Database:

Import the test.shoescollection file into your MongoDB database.


API Documentation
Base URL
http://localhost:4000/api/v1


Endpoints
GET /products
Description: Retrieve a list of all products.

GET /products/:id
Description: Retrieve a single product by its ID.


Design Decisions
Component Structure:

The application is divided into several components such as Navbar, Card, DetailCard, and Home to promote reusability and maintainability.

State Management:

State is managed using the useState and useEffect hooks to handle component state and side effects, like fetching data from the API.

Styling:

Tailwind CSS is used for styling the application because it provides utility-first CSS classes that allow for rapid UI development.

Challenges Faced
Handling Asynchronous Data Fetching:

Ensuring data is fetched and available before rendering components that depend on it. This was solved using conditional rendering and state management.

State Lifting:

Lifting state up to share state between components was another challenge. It was addressed by managing the state in the parent component and passing state setters to child components via props.

Error Handling:

Implementing proper error handling for API requests to ensure the application gracefully handles errors and displays meaningful messages to the user.
