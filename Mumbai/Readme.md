# Book Review Application

### Installation

1.  **Clone the repository:**

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

```dotenv
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreviewdb # Or your MongoDB Atlas URI
JWT_SECRET=your_super_secret_jwt_key_here
