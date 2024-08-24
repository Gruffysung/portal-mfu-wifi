import { thaid_setdata } from '../../../../lib/thaid'; // ปรับเส้นทางตามที่จำเป็น
import axios from 'axios';

export async function GET(request) {
  const url = new URL(request.url);

  const { urlAuth, clientID, redirect_uri, scopeText, state } = thaid_setdata(); // call value from lib/thaid.js

  // Construct the authentication URL by combining the values received from thaid_setdata
  const authUrl = `${urlAuth}?response_type=code&client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${scopeText}&state=${state}`;

  // Define headers for the request
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    // Make a request to the authentication URL using axios with the specified headers
    const response = await axios.get(authUrl, { headers });
    // Retrieve the data from the response
    const data = response.data;
    // Return the authentication URL as a JSON response with a 200 (success) status
    return new Response(JSON.stringify({ authUrl }), { status: 200 });
  } catch (error) {
    // If an error occurs during the request, return an error message as a JSON response with a 500 (server error) status
    return new Response(JSON.stringify({ error: 'Unable to fetch data from the authentication URL' }), { status: 500 });
  }
}
