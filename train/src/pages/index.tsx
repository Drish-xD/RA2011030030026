import { auth, fetchTrains, type Train } from './api/AuthApi';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

export default async function Home() {
  const trains = await auth().then(async (token) => await fetchTrains(token as string));
  return <section></section>;
}
