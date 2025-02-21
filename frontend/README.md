# CSVInsight Frontend Documentation

## Environment Setup
```env
VITE_BASE_URL=http://localhost:5000
```

## Routes & Components

### 1. Home Route (/)
- **Component**: `Home.jsx`
- **Purpose**: File upload interface
- **Features**:
  - CSV file selection
  - File upload to backend
  - Success/Error notifications
  - Auto-navigation to data view
- **API Integration**:
  ```javascript
  POST /upload
  Content-Type: multipart/form-data
  Body: FormData{
    file: [CSV File]
  }
  ```
- **Response Handling**:
  ```javascript
  Success: {
    status: 200,
    data: {
      success: true,
      message: "File uploaded successfully"
    }
  }
  
  Error: {
    error: "Failed to upload your file"
  }
  ```

### 2. Data Route (/data)
- **Component**: `Data.jsx`
- **Purpose**: Display and filter CSV data
- **Features**:
  - Dynamic column display
  - Field-based filtering
  - Value-based filtering
  - Clear filter options
- **API Integration**:
  ```javascript
  GET /getData
  ```
- **Response Structure**:
  ```javascript
  {
    success: true,
    headers: ["column1", "column2", ...],
    employees: [{
      _id: "...",
      column1: "value1",
      column2: "value2",
      createdAt: "timestamp"
    }]
  }
  ```

## Components

### Card Component
- **File**: `components/Card.jsx`
- **Props**:
  ```javascript
  {
    headers: string[],
    employee: {
      [key: string]: string | number
    }
  }
  ```
- **Styling**:
  - Responsive design
  - Hover effects
  - Shadow effects
  - Transition animations

## State Management
- File upload status
- Data filtering state
- Dynamic headers handling
- Employee data storage

## API Integration Details

### File Upload
```javascript
const formData = new FormData();
formData.append("file", file);

axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, formData)
```

### Data Fetching
```javascript
axios.get(`${import.meta.env.VITE_BASE_URL}/getData`)
```

## Data Filtering Implementation
- Two-level filtering system:
  1. Field selection
  2. Value selection
- Filter reset functionality
- Automatic value list generation

## UI/UX Features

### Home Page
- File input validation
- Upload progress feedback
- Error message display
- Responsive design

### Data View
- Dynamic card layout
- Interactive filter dropdowns
- Smooth transitions
- Hover effects on cards

## Styling
Using TailwindCSS for:
- Responsive design
- Component styling
- Transitions
- Hover effects

Example class combinations:
```css
/* Card Hover Effect */
.hover:scale-105 .transition-transform .duration-300

/* Filter Buttons */
.border-2 .border-black .rounded-md .px-4 .py-2 .bg-gray-300

/* Layout */
.flex .flex-col .items-center .justify-center
```

## Error Handling
- File validation errors
- Upload failures
- Data fetch errors
- Filter application errors

## Performance Considerations
- Efficient re-rendering
- useEffect dependencies
- State management optimization
- Dynamic component rendering

## Testing
Manual testing steps for:
1. File upload
2. Data display
3. Filter functionality
4. Navigation
5. Error scenarios
