const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Define your Appwrite API endpoint and project ID
const appwriteEndpoint = 'https://cloud.appwrite.io/v1';
const projectId = '65f82794ceba84a3c4fd';
const apiKey = 'a18404aac41fa2745a00c6739713d0995556bd2ea5cc75fd9a1bbcf7214f4fcf26ae47d1d05c5670e83cab79a3ec94591acbd0a1f294595b9e286fae8599ce18a46b3f816fa4cfdc24262e36dd9b91f7d98877a23ca2aaefdc093b00eba59a0efc025c40716300cfb642b9b84181577dee84c1812552e65c6d54a9d197cb1cdd';

// Endpoint to fetch data based on QR code
app.get('/fetch_data', async (req, res) => {
  const qrData = req.query.qr_data;

  try {
    // Retrieve data from Appwrite based on the QR code data
    const response = await axios.get(`${appwriteEndpoint}/database/documents`, {
      params: {
        search: qrData,
        limit: 1
      },
      headers: {
        'X-Appwrite-Project': projectId,
        'X-Appwrite-Key': apiKey
      }
    });

    // Extract and return the relevant data
    if (response.data.documents.length > 0) {
      res.json(response.data.documents[0]);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error('Error fetching data from Appwrite:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
