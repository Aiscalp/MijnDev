import { useApi } from '@/api/useApi';
import { CarFormModel } from '@/components/models/CarFormModel';

const api = useApi();

async function getCar(kenteken: string): Promise<Array<CarFormModel>> {
  const response = await api.get<Array<CarFormModel>>(`m9d7-ebf2.json?kenteken=${kenteken}`);
  // console.log('getcar', response.data[0].merk);
  // console.log('getcar', response.data[0].datum_eerste_toelating);
  return response.data;
}

export function useCarFormService() {
  return {
    getCar,
  };
}
