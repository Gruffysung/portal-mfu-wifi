import { thaid_setdata } from '../../../../lib/thaid'; // ปรับเส้นทางตามที่จำเป็น
import axios from 'axios';

export async function GET(request) {
  const url = new URL(request.url);

  const { urlAuth, clientID, redirect_uri, scopeText, state } = thaid_setdata();

  const authUrl = `${urlAuth}?response_type=code&client_id=${clientID}&redirect_uri=${redirect_uri}&scope=${scopeText}&state=${state}`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  try {
    const response = await axios.get(authUrl, { headers });
    const data = response.data;
    return new Response(JSON.stringify({ authUrl }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'ไม่สามารถดึงข้อมูลจาก URL การยืนยันตัวตนได้' }), { status: 500 });
  }
}
