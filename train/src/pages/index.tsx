import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { auth, fetchTrains } from './api/AuthApi';

const columns: GridColDef[] = [
  { field: 'trainNumber', headerName: 'Train Number', width: 120 },
  { field: 'trainName', headerName: 'Train Name', width: 150 },
  {
    field: 'departureTime',
    headerName: 'Departure Time',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.departureTime.Hours}:${params.row.departureTime.Minutes}`,
  },
  {
    field: 'seatsAvailable',
    headerName: 'Seats Available',
    width: 140,
    valueGetter: (params: GridValueGetterParams) =>
      `Sleeper: ${params.row.seatsAvailable.sleeper}, AC: ${params.row.seatsAvailable.AC}`,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `Sleeper: ${params.row.price.sleeper}, AC: ${params.row.price.AC}`,
  },
  { field: 'delayedBy', headerName: 'Delayed By (min)', type: 'number', width: 150 },
];

export default async function Home() {
  const trains = await auth().then(async (token) => await fetchTrains(token as string));
  return (
    <section>
      <DataGrid
        rows={trains!}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </section>
  );
}
