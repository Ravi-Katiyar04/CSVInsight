# Backend API Documentation

## Product Endpoints

### Upload CSV File
`POST /product/uploadFile`

Upload and process a CSV file containing product data.

#### Request
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body Parameter:
  - `file`: CSV file containing product data

#### CSV File Format
The CSV file should contain the following columns:
- `id` (Number)
- `name` (String)
- `flavour` (String)
- `size` (String)
- `price` (Number)

#### Response
```json
{
    "status": 200,
    "message": "File successfully"
}
```

#### Error Response
```json
{
    "status": 400,
    "message": "Error message details"
}
```

#### Example Usage
```bash
curl -X POST -F "file=@products.csv" http://localhost:YOUR_PORT/product/uploadFile
```

## Employee Endpoints

### Upload CSV File
`POST /employee/uploadFile`

Upload and process a CSV file containing employee data.

#### Request
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body Parameter:
  - `file`: CSV file containing employee data

#### CSV File Format
The CSV file should contain the following columns:
- `NAME` (String)
- `NUMBER` (Number)
- `ADDRESS` (String)

#### Response
```json
{
    "status": 200,
    "message": "File successfully"
}
```

#### Error Response
```json
{
    "status": 400,
    "message": "Error message details"
}
```

#### Example Usage
```bash
curl -X POST -F "file=@employees.csv" http://localhost:YOUR_PORT/employee/uploadFile
```
