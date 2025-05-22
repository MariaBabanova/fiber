const API_BASE_URL = 'https://example.com'; 

// 1. POST /login
async function login(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        console.log('Login successful:', data);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// 2. GET /device/psu1/stats
async function getDeviceStats(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/device/psu1/stats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch stats');
        }

        console.log('Device stats:', data);
        return data;
    } catch (error) {
        console.error('Stats error:', error);
        throw error;
    }
}

// 3. POST /devices/psu1/command
async function sendDeviceCommand(command, token) {
    try {
        const response = await fetch(`${API_BASE_URL}/devices/psu1/command`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ command }) 
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Command failed');
        }

        console.log('Command response:', data);
        return data;
    } catch (error) {
        console.error('Command error:', error);
        throw error;
    }
}
