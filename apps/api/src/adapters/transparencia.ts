import { Adapter, AdapterReturn } from '../types';

const adapter: Adapter = {
  async fetchByCNPJ(): Promise<AdapterReturn> {
    return {
      campos: [],
      pendencias: []
    };
  }
};

export default adapter;
