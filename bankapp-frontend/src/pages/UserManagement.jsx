import React, { useRef, useState } from 'react';
import { Button, Typography, Container, Box, Alert } from '@mui/material';
import * as XLSX from 'xlsx'; // Import the library
import api from '../api';

const UserManagement = () => {
    const fileInputRef = useRef(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                // 1. Read the file data
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // 2. Convert sheet to an array of objects
                const json = XLSX.utils.sheet_to_json(worksheet);

                if (json.length === 0) {
                    setMessage('The Excel file is empty or has no data.');
                    setIsError(true);
                    return;
                }

                // 3. Map the data to match the backend's expected fields (e.g., "Name" -> "name")
                const usersToCreate = json.map(user => ({
                    name: user.Name,
                    email: user.Email,
                    password: user.Password
                }));

                setMessage('Processing users...');
                setIsError(false);

                // 4. Send the entire array to the new backend endpoint
                await api.post('/auth/register/bulk', usersToCreate);

                setMessage(`${usersToCreate.length} user(s) have been registered successfully!`);
                setIsError(false);

            } catch (error) {
                setMessage(error.response?.data?.message || 'An error occurred during registration.');
                setIsError(true);
            } finally {
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const handleBulkUploadClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    User Management
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Upload an Excel file with columns: **Name, Email, Password**.
                </Typography>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept=".xlsx, .xls"
                />

                <Button variant="contained" onClick={handleBulkUploadClick}>
                    Upload and Register Users
                </Button>

                {message && (
                    <Alert severity={isError ? 'error' : 'success'} sx={{ mt: 3 }}>
                        {message}
                    </Alert>
                )}
            </Box>
        </Container>
    );
};

export default UserManagement;