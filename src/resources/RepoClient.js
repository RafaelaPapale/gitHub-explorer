import client from './config';

const repoPath = '/repos';

const ClientRepository = {
  async consultRepo(repoName) {
    try {
      const response = await client.get(`${repoPath}/${repoName}`);
      return response;
    } catch (e) {
      return e;
    }
  },
};

export default ClientRepository;