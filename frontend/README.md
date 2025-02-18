# CSVInsight Frontend Documentation

## Environment Variables
```env
VITE_BASE_URL=http://localhost:5000
```

## Routes Structure

### Home Page
- **Path**: `/`
- **Component**: `Home`
- **Description**: Landing page with navigation options to upload files

### Upload Forms
- **Path**: `/upload/employee` 
- **Component**: `EmployeeUpload`
- **Description**: Form to upload employee CSV files
- **API Integration**:
  ```javascript
  POST /employee/uploadFile
  Content-Type: multipart/form-data
  Response: {
    status: 200,
    message: "File uploaded successfully"
  }
  ```

- **Path**: `/upload/product`
- **Component**: `ProductUpload`
- **Description**: Form to upload product CSV files
- **API Integration**:
  ```javascript
  POST /product/uploadFile
  Content-Type: multipart/form-data
  Response: {
    status: 200,
    message: "File uploaded successfully",
    fileType: "product"
  }
  ```

## Components Structure


### Form Components
- `FileUpload`: Reusable file upload component with:
  - File selection
  - Drag & drop support
  - File type validation
  - Upload progress indicator

### UI Components
- `Button`: Reusable button component
- `Loading`: Loading spinner component

## API Integration
The frontend uses Axios for API calls. Base configuration:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

### Error Handling
All API calls are wrapped with try-catch blocks:
```javascript
try {
  const response = await api.post('/endpoint', formData);
  // Handle success
} catch (error) {
  // Handle error with Alert component
}
```

## Styling
- TailwindCSS for utility-first styling
- Custom CSS modules where needed
- Responsive design breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
