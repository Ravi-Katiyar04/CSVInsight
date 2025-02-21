# CSVInsight Backend API Documentation

## Setup

```bash
npm install
npm start
```

## Environment Variables

```env
PORT=5000
DB_URL=mongodb+srv://[username]:[password]@[cluster].mongodb.net/[database]
```

## API Endpoints

### 1. Upload CSV File
- **URL**: `/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Request Body**:
  ```
  file: [CSV File]
  ```
- **Description**: Uploads and processes any CSV file with dynamic columns
- **Example Request**:
  ```bash
  curl -X POST \
    http://localhost:5000/upload \
    -H 'Content-Type: multipart/form-data' \
    -F 'file=@/path/to/your/file.csv'
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Data imported successfully"
  }
  ```
- **Error Response**:
  ```json
  {
    "status": 500,
    "error": "An error occurred while processing the CSV file."
  }
  ```

### 2. Get Processed Data
- **URL**: `/getData`
- **Method**: `GET`
- **Description**: Retrieves all processed data from the most recently uploaded CSV
- **Example Request**:
  ```bash
  curl http://localhost:5000/getData
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "headers": ["column1", "column2", "column3"],
    "employees": [
      {
        "_id": "65df12345678901234567890",
        "column1": "value1",
        "column2": "value2",
        "column3": "value3",
        "createdAt": "2024-02-28T12:00:00.000Z"
      }
    ]
  }
  ```
- **Error Response**:
  ```json
  {
    "error": "error fetching employees: [error details]"
  }
  ```

## Data Storage

### Dynamic Schema Generation
- The system automatically generates MongoDB schemas based on CSV headers
- All fields are stored as Strings by default
- Each document includes:
  - Dynamic fields from CSV columns
  - `createdAt` timestamp
  - 24-hour data expiration

Example of generated schema:
```javascript
{
  [headerName]: { 
    type: String 
  },
  // ... other dynamic fields
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours
  }
}
```

## File Upload Specifications

### Storage Configuration
- Files are temporarily stored in `./public/uploads/`
- Original filenames are preserved
- Uses multer for file handling

### CSV Processing
- Supports any CSV format with headers
- Automatically detects column names
- Processes data row by row
- Handles large files efficiently using streams

## Error Handling

Common error scenarios:
- Invalid CSV format
- File upload failures
- Database connection issues
- Data processing errors

Error response format:
```json
{
  "error": "Error description",
  "status": 400/500
}
```

## Database Configuration

The application uses MongoDB with automatic schema generation:
- Dynamic collection names based on timestamp
- Automatic data cleanup after 24 hours
- Flexible schema adaptation to any CSV structure

## Security Considerations

- File size limits enforced by multer
- Temporary file storage with cleanup
- Data expiration for privacy
- Input validation for CSV format

## Testing

```bash
npm test
```

Test coverage includes:
- CSV upload functionality
- Data retrieval
- Schema generation
- Error handling
