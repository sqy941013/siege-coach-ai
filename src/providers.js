/** Provider boundary for future server integration; not used to claim live access. */
import {matches} from './analytics.js';
export const demoProvider = {
  status: 'synthetic',
  async listMatches() { return matches.map(record => ({...record, source:'synthetic'})); }
};
export const statsCcProvider = {
  status: 'not-configured',
  async listMatches() {
    throw new Error('Stats.cc integration is not implemented. Obtain permission and use a server-side adapter; never send an API key from this client.');
  }
};
export const languageModelProvider = {
  status: 'not-configured',
  async generateReport() {
    throw new Error('No language model is configured. The current app uses deterministic coaching rules.');
  }
};
