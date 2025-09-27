import { Adapter, AdapterReturn } from '../types';

const esocialAdapter: Adapter = {
  async fetchByCNPJ(): Promise<AdapterReturn> {
    return {
      campos: [],
      pendencias: ['ESOCIAL_BASE_URL']
    };
  }
};

export default esocialAdapter;
