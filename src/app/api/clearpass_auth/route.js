
// export async function POST(req) {

//     const mac = "1a-2a-3a-4a-5a-6a"
//     try {
//         const disconnectUrl = `https://clearpass.mfu.ac.th:443/api/session-action/disconnect/mac/${mac}?async=true`;

//         const disconnectResponse = await fetch(disconnectUrl, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${token}`
//             },
//         });
//         console.log(disconnectUrl);
        

//         const responseText = await disconnectResponse.text();

//         if (!disconnectResponse.ok) {
//             throw new Error(`Session: ${disconnectResponse.status} - ${responseText}`);
//         }

//         const sessionDisconnect = await disconnectResponse.json();
//         console.log('Disconnect Response:', sessionDisconnect);
//         // console.log(result);
//         return new Response(JSON.stringify(sessionDisconnect), { status: 200 });
//     }
//     catch (error) {
//         console.error(error);
//         return new Response(JSON.stringify({ error: error.message }), { status: 500 });
//     }
// }
