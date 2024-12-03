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
            // if db has no this data, create new data. if data already exits, there is no need to create new data
            await User.create({
                CitizenID: hashedCitizenID,  // Used hash CitizenID
                FirstName: tokenData.given_name,
                LastName: tokenData.family_name,
                
            });
        }
        return new Response(JSON.stringify(response.data), { status: response.status });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch token' }), { status: 500 });
    }
}
