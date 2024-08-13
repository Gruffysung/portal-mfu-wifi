export async function POST(req) {
    // Start clearPass Auth
    const url = `https://clearpass.mfu.ac.th:443/api/oauth`;

    const data = {
        grant_type: "password",
        username: process.env.NEXT_PUBLIC_CLEARPASS_USERNAME,
        password: process.env.NEXT_PUBLIC_CLEARPASS_PASSWORD,
        client_id: process.env.NEXT_PUBLIC_CLEARPASS_CLIENT_ID
    };

    // const { mac } = await req.json();
    const mac = '1a-2a-3a-4a-5a-6a'
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const result = await response.json();
        const token = result.access_token;
        // ================================================================================================================
        // Start Enpoint/mac-address
        const patchUrl = `https://clearpass.mfu.ac.th:443/api/endpoint/mac-address/${mac}`;
        const patchData = {
            "mac_address": mac,
            "description": "update by nut with node.js",
            "status": "Known",
            "attributes": { "Allow-Guest-Internet": "true" }
        };

        const patchResponse = await fetch(patchUrl, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(patchData)
        });


        if (!patchResponse.ok) {
            throw new Error(`Endpoint: ${patchResponse.status}`);
        }
        const endpointData = await patchResponse.json();
        // End endpoint/mc-address
        // ===================================================================================================================
        // Start session-atcion/disconnect
        const disconnectUrl = `https://clearpass.mfu.ac.th:443/api/session-action/disconnect/mac/${mac}?async=true`;

        const bodyData = {
            filter: { mac_address: mac },
        };

        const disconnectResponse = await fetch(disconnectUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bodyData)
        });

        const responseText = await disconnectResponse.json();

        if (!disconnectResponse.ok) {
            throw new Error(`Session: ${disconnectResponse.status} - ${responseText}`);
        }

        return new Response(JSON.stringify(responseText), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
