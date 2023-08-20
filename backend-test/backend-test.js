const axios = require('axios');

const apiUrl = 'https://flights-api.buraky.workers.dev/';

// HTTP Status Code Test
axios.get(apiUrl)
  .then(response => {
    if (response.status === 200) {
      console.log('HTTP Status Code Test: Passed');
    } else {
      console.log('HTTP Status Code Test: Failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Response Content Test
axios.get(apiUrl)
  .then(response => {
    const responseData = response.data;

    if (responseData.data && Array.isArray(responseData.data)) {
      console.log('Response Content Test: Passed');
    } else {
      console.log('Response Content Test: Failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Header Check Test
axios.get(apiUrl)
  .then(response => {
    const contentType = response.headers['content-type'];

    if (contentType === 'application/json') {
      console.log('Header Check Test: Passed');
    } else {
      console.log('Header Check Test: Failed');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
