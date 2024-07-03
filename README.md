# API Documentation
1. ## Issue Certificate
    - **Endpoint:** /issue-certificate
    - **Method:** POST
    - **Description:** Issues a certificate to the blockchain network.
    - **Request Body:**
```javascript
            {
                "tracking_id": "1"
            }

```


- **tracking_id (int):** The tracking ID associated with the certificate.

- **Response**:
    - **200 OK:** Certificate successfully issued.

```javascript
        {
            "certificate_id": "1234",
        }
```
-  **400 Bad Request:** 400 Bad Request

```javascript
    {
        "data": "Missing required fields"
    }
```
-  **500 Internal Server Error:** Failed to connect to the blockchain network.

```javascript
    {
        "data": "No data found for track id 1`"
    }
```

2. ## Read Request by Tracking ID
    - **Endpoint:** /read-request/:tracking_id
    - **Method:** GET
    - **Description:** Reads a request from the blockchain network using a tracking ID.
    - **URL Parameter:**
        - tracking_id (int): The tracking ID of the request.
- **Response**:
    - **200 OK:** Request successfully retrieved
```javascript
            {
                "data": {
                    "track_id": "1",
                    "student_name": "John Doe",
                    "student_id": "123456",
                    "degree": "Bachelor of Science",
                    "major": "Computer Science",
                    "result": "3.25"
                    ...
                }
            }
```
-  **400 Bad Request:** Invalid path (tracking ID missing)

```javascript
    {
        "data": "Invalid Path"
    }
```
-  **500 Internal Server Error:** No data found for the given tracking ID.
```javascript
    {
        "data": "No data found for id 1"
    }
```


3. ## Read Request by Tracking ID (Alternate)
    - **Endpoint:** /read-request
    - **Method:** POST
    - **Description:** Reads a request from the blockchain network using a tracking ID provided in the request body.
    - **Request Body:**
```javascript
        {
            "tracking_id": "1"
        }

```
- tracking_id (int): The tracking ID of the request.

- **Response**:
    - **200 OK:** Request successfully retrieved
```javascript
            {
                "data": {
                    "track_id": "1",
                    "student_name": "John Doe",
                    "student_id": "123456",
                    "degree": "Bachelor of Science",
                    "major": "Computer Science",
                    "result": "3.25"
                    ...
                }
            }
```
-  **400 Bad Request:** Invalid path (tracking ID missing)

```javascript
    {
        "data": "Invalid Path"
    }
```
-  **500 Internal Server Error:** No data found for the given tracking ID.
```javascript
    {
        "data": "No data found for id 1"
    }
```


4. ## Get All Requests
    - **Endpoint:** /get-all-the-request
    - **Method:** GET
    - **Description:** Retrieves all requests from the blockchain network.

- **Response**:
    - **200 OK:** Requests successfully retrieved
```javascript
            {
                "data": [
                    {
                        "track_id": "1",
                        "student_name": "John Doe",
                        "student_id": "123456",
                        "student_email": "123456",
                        "degree": "Bachelor of Science",
                        "major": "Computer Science",
                        "result": "3.25"
                        ...
                    },
                      {
                        "track_id": "2",
                        "student_name": "John Denver",
                        "student_id": "205642",
                        "degree": "Bachelor of Science",
                        "major": "Electrical Electronics",
                        "result": "3.25"
                        ...
                    },
                    
                ]
            }

```
-  **500 Internal Server Error:** No data found for the given tracking ID.
```javascript
    {
        "data": "Failed To Connect The Blockchain Network"
    }
```

5. ## Read Request by Tracking ID (Alternate)
    - **Endpoint:** /read-certificate-by-id
    - **Method:** POST
    - **Description:**  Reads a certificate from the blockchain network using a certificate ID.
    - **Request Body:**
```javascript
        {
            "certificate_id": "1254"
        }

```
- certificate_id (int): The ID of the certificate.

- **Response**:
    - **200 OK:** Request successfully retrieved
```javascript
            {
                "data": {
                    "track_id": "1",
                    "student_name": "John Doe",
                    "student_id": "123456",
                    "degree": "Bachelor of Science",
                    "major": "Computer Science",
                    "result": "3.25",
                    ...
                }
            }
```
-  **400 Bad Request:** Required certificate ID is missing

```javascript
    {
        "data": "Required Certificate Id Is Missing"
    }

```
-  **500 Internal Server Error:** Certificate not found for the given ID.
```javascript
    {
        "data": "Certificate Not Found For The Id 2502"
    }
```

6. ## History of Certificate
    - **Endpoint:** /history-of-certificate
    - **Method:** GET
    - **Description:**  Retrieves the history of a certificate from the blockchain network using a tracking ID.
    - **Request Body:**
```javascript
        {
            "tracking_id": "1"
        }

```
- tracking_id (int): The tracking ID of the certificate.

- **Response**:
    - **200 OK:**  Certificate history successfully retrieved
```javascript
            {
                "data": [
                    {
                        "track_id": "1",
                        "student_name": "John Doe",
                        "degree": "Bachelor of Science",
                        "major": "Computer Science",
                        "result": "3.25"
                    },
                    ...
                ]
            }
```
-  **400 Bad Request:** Required tracking ID is missing

```javascript
    {
        "data": "Required Fields Tracking_Id Is Missing"
    }

```
-  **500 Internal Server Error:** Certificate history not found for the given tracking ID

```javascript
    {
        "data": "Certificate History Is Not Found For The Tracking Id : 1"
    }
```

7. ## Verify Certificate By Certificate Hash
    - **Endpoint:** /verify-by-hash
    - **Method:** POST
    - **Description:**  Verifies a certificate by its hash
    - **Request Body:**
```javascript
        {
            "certificate_hash": "aakbashdbkhdsjh..."
        }

```
- certificate_hash (string): The hash of the certificate.

- **Response**:
    - **200 OK:** Request successfully retrieved
```javascript
            {
                "data": {
                    "track_id": "1",
                    "student_name": "John Doe",
                    "student_id": "123456",
                    "degree": "Bachelor of Science",
                    "major": "Computer Science",
                    "result": "3.25",
                    ...
                }
            }
```
-  **400 Bad Request:** Required certificate hash is missing

```javascript
    {
        "data": "Required Certificate hash Is Missing"
    }

```
-  **500 Internal Server Error:** Certificate not found for the given hahs.
```javascript
    {
        "data": "Certificate Not Found For The Id aakbashdbkhdsjh....."
    }
```


