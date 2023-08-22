import { Box, Card, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { auth, fetchTrain } from './api/AuthApi';

export default async function Train() {
  const {
    query: { slug },
  } = useRouter();

  const train = await auth().then(
    async (token) => await fetchTrain(slug! as string, token as string)
  );

  const {
    trainName,
    trainNumber,
    departureTime: { Hours, Minutes },
    seatsAvailable: { AC, sleeper },
    delayedBy,
    price,
  } = train!;
  return (
    <Box component='span'>
      <Card>
        <Typography sx={{ fontSize: 14 }} color='text.secondary'>
          Train Number: {trainNumber}
          <br />
          Train Name: {trainName}
          <br />
          Departure Time: {Hours}:{Minutes}
          <br />
          Seats Available - Sleeper: {sleeper}, AC: {AC}
          <br />
          Price - Sleeper: {price.sleeper}, AC: {price.AC}
          <br />
          Delayed By: {delayedBy} minutes
        </Typography>
      </Card>
    </Box>
  );
}
