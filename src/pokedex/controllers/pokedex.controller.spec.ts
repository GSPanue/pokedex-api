import { Test, TestingModule } from '@nestjs/testing';

import { PokedexController } from './pokedex.controller';
import { IPokedexController, IPokedexService } from '../interfaces';
import { POKEDEX_SERVICE } from '../constants';

describe('PokedexController', () => {
  let pokedexController: IPokedexController;
  let pokedexService: IPokedexService;

  const mockPokedexService = {
    getPokemon: jest.fn(),
    getPokemonById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokedexController],
      providers: [
        {
          provide: POKEDEX_SERVICE,
          useValue: mockPokedexService,
        },
      ],
    }).compile();

    pokedexController = module.get<IPokedexController>(PokedexController);
    pokedexService = module.get<IPokedexService>(POKEDEX_SERVICE);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(pokedexController).toBeDefined();
  });

  it('should be defined', () => {
    expect(pokedexService).toBeDefined();
  });

  describe('getPokemon', () => {
    it('should return an object', async () => {
      const value = {
        results: [],
        count: 0,
      };

      mockPokedexService.getPokemon.mockReturnValueOnce(value);

      const res = await pokedexController.getPokemon({});

      expect(res).toHaveProperty('query');
      expect(res).toHaveProperty('results');
      expect(res).toHaveProperty('count');
    });

    it('should have an empty array assigned to results', async () => {
      const value = {
        results: [],
      };

      mockPokedexService.getPokemon.mockReturnValueOnce(value);

      const res = await pokedexController.getPokemon({});

      expect(res.results).toEqual([]);
    });

    it('should have a number assigned to count', async () => {
      const value = {
        count: 0,
      };

      mockPokedexService.getPokemon.mockReturnValueOnce(value);

      const res = await pokedexController.getPokemon({});

      expect(res.count).toEqual(0);
    });

    it('should return an array of Pokémon within the results object', async () => {
      const value = {
        results: [
          {
            name: 'Bulbasaur',
          },
        ],
      };

      mockPokedexService.getPokemon.mockReturnValueOnce(value);

      const res = await pokedexController.getPokemon({});

      expect(res.results).toEqual(value.results);
    });

    it('should call getPokemon() with the provided query parameters', async () => {
      const query = {
        limit: 100,
        offset: 1,
        sort: 'generation',
        order: 'desc',
      };

      await pokedexController.getPokemon(query);

      expect(mockPokedexService.getPokemon).toHaveBeenCalledWith(query);
      expect(mockPokedexService.getPokemon).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPokemonById', () => {
    it('should return an object', async () => {
      const params = { id: 1 };
      const value = {
        results: [],
        count: 0,
      };

      mockPokedexService.getPokemonById.mockReturnValueOnce(value);

      const res = await pokedexController.getPokemonById(params);

      expect(res).toHaveProperty('results');
      expect(res).toHaveProperty('count');
    });

    it('should have an empty array assigned to results', async () => {
      const params = { id: 1 };
      const value = {
        results: [],
      };

      mockPokedexService.getPokemonById.mockReturnValueOnce(value);

      const res = await pokedexController.getPokemonById(params);

      expect(res.results).toEqual(value.results);
    });

    it('should have a number assigned to count', async () => {
      const params = { id: 1 };
      const value = {
        count: 0,
      };

      mockPokedexService.getPokemonById.mockReturnValueOnce(value);

      const res = await pokedexController.getPokemonById(params);

      expect(res.count).toEqual(0);
    });

    it('should return an array of Pokémon within the results object', async () => {
      const params = { id: 1 };
      const value = {
        results: [
          {
            name: 'Bulbasaur',
          },
        ],
      };

      mockPokedexService.getPokemonById.mockReturnValueOnce(value);

      const res = await pokedexController.getPokemonById(params);

      expect(res.results).toEqual(value.results);
    });

    it('should call getPokemonById() with the provided path parameter', async () => {
      const params = { id: 1 };

      await pokedexController.getPokemonById(params);

      expect(mockPokedexService.getPokemonById).toHaveBeenCalledWith(params);
      expect(mockPokedexService.getPokemonById).toHaveBeenCalledTimes(1);
    });
  });
});
