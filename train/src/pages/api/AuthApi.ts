import axios from 'axios';

export interface Train {
  trainName: string;
  departureTime: {
    Hours: number;
    Minutes: number;
    Seconds: number;
  };
  trainNumber: string;
  seatsAvailable: {
    sleeper: number;
    AC: number;
  };
  price: {
    sleeper: number;
    AC: number;
  };
  delayedBy: number;
}

const auth = async () => {
  try {
    const response = await fetch('https://20.244.144/train/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: 'srmist',
        clientID: '1cedaecf-36dd-4d86-a47e-ab1c1fe67c4f',
        clientSecret: 'uqAypDwqrqthZWVL',
        ownerName: 'Drish',
        ownerEmail: 'dr3710@srmist.edu.in',
        rollNo: 'RA2011030030026',
      }),
    });

    if (response.ok) {
      const AUTHTOKEN = await response.text();
      return AUTHTOKEN;
    }
  } catch (error) {
    console.error('Error during token retrieval:', error);
  }
};

async function fetchTrains(AUTHTOKEN: string) {
  try {
    const response = await axios.get('http://20.244.56.144:80/train/trains', {
      headers: {
        Authorization: `Bearer ${AUTHTOKEN}`,
      },
    });
    const data: Train[] = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching train data:', error);
  }
}

async function fetchTrain(slug: string, AUTHTOKEN: string) {
  try {
    const response = await axios.get(`http://20.244.56.144:80/train/trains/${slug}`, {
      headers: {
        Authorization: `Bearer ${AUTHTOKEN}`,
      },
    });
    const data: Train = response.data;
    return data;
  } catch (error) {
    console.error('Error fetching train data:', error);
  }
}

export { auth, fetchTrain, fetchTrains };

