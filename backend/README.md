
# Backend API Documentation

<!-- ## Setup
```bash
npm install
npm start
``` -->

## Environment Variables
- `PORT`: Server port (default: 5000)
- `DB_URL`: MongoDB connection string

## API Endpoints

### 1. Product Routes
Base path: `/product`

#### Upload Product CSV
- **Endpoint**: `POST /product/uploadFile`
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  - `file`: CSV file containing product data
- **CSV Format**:
  ```csv
  name,flavour,size,price
  Product1,Vanilla,Large,29.99
  ```
- **Success Response** (200):
  ```json
  {
    "status": 200,
    "message": "File successfully",
    "fileType": "product"
  }
  ```
- **Error Response** (400):
  ```json
  {
    "status": 400,
    "message": "Error message details"
  }
  ```

### 2. Employee Routes
Base path: `/employee`

#### Upload Employee CSV
- **Endpoint**: `POST /employee/uploadFile`
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  - `file`: CSV file containing employee data
- **CSV Format**:
  ```csv
  NAME,NUMBER,ADDRESS
  John Doe,1234567890,123 Main St
  ```
- **Success Response** (200):
  ```json
  {
    "status": 200,
    "message": "File successfully"
  }
  ```
- **Error Response** (400):
  ```json
  {
    "status": 400,
    "message": "Error message details"
  }
  ```

### File Validation Middleware
The application includes middleware that validates CSV files:

- Checks if file is present
- Validates CSV headers
- Detects CSV type (employee or product)
- Validates file format

#### Error Responses for File Validation:
```json
{
  "error": "No CSV file uploaded"
}
```
```json
{
  "error": "Invalid CSV format"
}
```
```json
{
  "error": "Error processing CSV file",
  "details": "Error details message"
}
```

### Data Models

#### Product Schema
```javascript
{
  name: String,
  flavour: String,
  size: String,
  price: Number
}
```

#### Employee Schema
```javascript
{
  name: String,
  number: Number,
  address: String
}
```
