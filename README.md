# CSVInsight Project

A web application for uploading and processing CSV files.

## Project Structure
```
CSVInsight/
├── backend/
│   ├── routes/
│   ├── db/
│   ├── public/uploads/
│   ├── app.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── pages/
    │   └── components/
    ├── public/
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm init -y
npm install express
npm install dotenv cors
npm install mongoose
npm install body-parser
npm install csv-parser
npm install csvtojson
npm install multer
```

3. Create a `.env` file with the following variables:
```env
PORT=5000
DB_URL=your_mongodb_connection_string
```

4. Create a `public/uploads` directory for CSV file storage:
```bash
mkdir -p public/uploads
```

5. Start the server:
```bash
npx nodemon
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm create vite@latest
npm install
```

3. Install additional dependencies:
```bash
npm install react-router-dom axios
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Backend Endpoints

#### 1. Upload CSV File
- **URL**: `/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  ```
  file: [CSV File]
  ```
- **Description**: Uploads and processes any CSV file with dynamic columns

#### 2. Get Processed Data
- **URL**: `/getData`
- **Method**: `GET`
- **Description**: Retrieves all processed data from the most recently uploaded CSV

#### 3. Edit Data
- **URL**: `/edit`
- **Method**: `PUT`
- **Content-Type**: `application/json`
- **Request Body**:
  ```json
  {
    "_id": "document_id",
    "field1": "new_value",
    "field2": "new_value"
  }
  ```
 

## Technologies Used
- **Frontend**: React.js with TailwindCSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **File Processing**: csvtojson

## Testing

### Backend Testing
Run the backend server with:
```bash
npx nodemon
```

### Frontend Testing
Run the frontend development server with:
```bash
npm run dev
```


