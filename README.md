# CSVInsight Project

A web application for uploading and processing CSV files for both product and employee data.

## Project Structure
```
CSVInsight/
├── backend/
│   ├── controllers/
│   ├── models/
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
npm install react-router-dom
npm install axios
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```
tailwind.config.js
```/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Product Routes
- `POST /product/uploadFile` - Upload product CSV file

### Employee Routes
- `POST /employee/uploadFile` - Upload employee CSV file

## CSV File Formats

### Product CSV Format
```csv
id,name,flavour,size,price
1,Product1,Vanilla,Large,29.99
```

### Employee CSV Format
```csv
NAME,NUMBER,ADDRESS
John Doe,1234567890,123 Main St
```

## Technologies Used
- Frontend: React.js with TailwindCSS
- Backend: Node.js with Express.js
- Database: MongoDB Atlas
- File Processing: csvtojson
