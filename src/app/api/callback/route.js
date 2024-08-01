import axios from 'axios';
import { thaid_setdata } from '../../../../lib/thaid';
import { connectMongoDB } from '../../../../lib/mongodb';
import User from '../../../../models/user';
import crypto from 'crypto';

// fnc hash CitizenID
const hashCitizenID = (id) => {
    return crypto.createHash('sha256').update(id).digest('hex');
};

export async function POST(req, res) {
    const { clientID, redirect_uri, clientSecret, urlToken } = thaid_setdata();
    try {
        const { code } = await req.json();

        const data = {
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
            code: code
        };

        const auth = `${clientID}:${clientSecret}`;
        const base64Auth = Buffer.from(auth).toString('base64');

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${base64Auth}`
        };

        const response = await axios.post(urlToken, new URLSearchParams(data).toString(), { headers });
        const tokenData = response.data;

        // connect MongoDb
        await connectMongoDB();

        // Insert Data To Db
        const hashedCitizenID = hashCitizenID(tokenData.pid); // hash CitizenID

        // Find data
        let user = await User.findOne({ CitizenID: hashedCitizenID });
        if (!user) {
            // ถ้าไม่มีข้อมูลให้เพิ่มข้อมูลใหม่
            await User.create({
                CitizenID: hashedCitizenID,  // Used hash CitizenID
                FirstName: tokenData.given_name,
                LastName: tokenData.family_name,
            });
        }
        // Timestamp ที่ให้มา
        const exp = tokenData.expires_in;

        // แปลงเป็น milliseconds (timestamp ปกติจะเป็น seconds ดังนั้นคูณด้วย 1000)
        const date = new Date(exp * 1000);

        // แสดงผลลัพธ์
        // console.log(date.toString()); // แสดงวันที่และเวลาในรูปแบบที่อ่านได้


        // console.log(tokenData);
        return new Response(JSON.stringify(response.data), { status: response.status });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch token' }), { status: 500 });
    }
}
