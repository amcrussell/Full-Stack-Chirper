

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';


export async function fetchData(endpoint: string, method: string = 'GET', payload: any = null) {

    try {
        
        const options: RequestInit = {
            method,
            headers: {}
        }

        if(payload && method !== 'GET') {
            options.headers = {
                'Content-Type': 'application/json'
            },
            options.body = JSON.stringify(payload);

        }

        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        if(!response.ok) {
            throw new Error(`HTTP Error Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.log(`Fetch error: ${error}`);
        throw error;
    }

}