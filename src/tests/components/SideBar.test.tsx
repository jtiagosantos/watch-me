import { api } from '../../services/api';
import AxiosMockAdapter from 'axios-mock-adapter';

const mockedAPI = new AxiosMockAdapter(api);

const mockedResponseBody = [
  {
    id: 1,
    name: 'action',
    title: 'Ação',
  },
  {
    id: 2,
    name: 'comedy',
    title: 'Comédia',
  },
  {
    id: 3,
    name: 'documentary',
    title: 'Documentário',
  },
  {
    id: 4,
    name: 'drama',
    title: 'Drama',
  },
  {
    id: 5,
    name: 'horror',
    title: 'Terror',
  },
  {
    id: 6,
    name: 'family',
    title: 'Família',
  }
];

describe('SideBar component', () => {
  it('fetch genres returns correctly data', async () => {
    mockedAPI.onGet('genres').reply(200, mockedResponseBody);

    const { data } = await api.get('genres');

    expect(data).toEqual(
      expect.arrayContaining([
        {
          id: 3,
          name: 'documentary',
          title: 'Documentário',
        }
      ])
    );
  });
});