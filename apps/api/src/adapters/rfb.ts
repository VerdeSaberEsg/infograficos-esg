import { Adapter, AdapterReturn } from '../types';

const rfbAdapter: Adapter = {
  async fetchByCNPJ(): Promise<AdapterReturn> {
    return { campos: [] };
  }
};

export default rfbAdapter;
