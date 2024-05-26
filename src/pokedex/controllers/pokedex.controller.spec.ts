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
    it('should return an array of Pokémon', async () => {
      const pokemonArray = [
        {
          name: 'Bulbasaur',
        },
      ];

      mockPokedexService.getPokemon.mockResolvedValueOnce(pokemonArray);

      const res = await pokedexController.getPokemon();

      expect(res).toEqual(pokemonArray);
    });

    it('should return an empty array', async () => {
      const pokemonArray = [];

      mockPokedexService.getPokemon.mockResolvedValueOnce(pokemonArray);

      const res = await pokedexController.getPokemon();

      expect(res).toEqual(pokemonArray);
    });

    it('should call getPokemon() with default query parameters when none are provided', async () => {
      const query = {
        limit: 10,
        offset: 0,
        sort: '',
        order: 'asc',
      };

      await pokedexController.getPokemon();

      expect(mockPokedexService.getPokemon).toHaveBeenCalledWith(
        query.limit,
        query.offset,
        query.sort,
        query.order,
      );

      expect(mockPokedexService.getPokemon).toHaveBeenCalledTimes(1);
    });

    it('should call getPokemon() with the provided query parameters', async () => {
      const query = {
        limit: 100,
        offset: 1,
        sort: 'generation',
        order: 'desc',
      };

      await pokedexController.getPokemon(
        query.limit,
        query.offset,
        query.sort,
        query.order,
      );

      expect(mockPokedexService.getPokemon).toHaveBeenCalledWith(
        query.limit,
        query.offset,
        query.sort,
        query.order,
      );

      expect(mockPokedexService.getPokemon).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPokemonById', () => {
    it('should return an array of Pokémon', async () => {
      const id = 1;

      const pokemonArray = [
        {
          id,
          name: 'Bulbasaur',
        },
      ];

      mockPokedexService.getPokemonById.mockResolvedValueOnce(pokemonArray);

      const res = await pokedexController.getPokemonById(id);

      expect(res).toEqual(pokemonArray);
    });

    it('should return an empty array', async () => {
      const pokemonArray = [];

      mockPokedexService.getPokemonById.mockResolvedValueOnce(pokemonArray);

      const res = await pokedexController.getPokemonById(1);

      expect(res).toEqual(pokemonArray);
    });

    it('should call getPokemonById() with the provided path parameter', async () => {
      const id = 1;

      await pokedexController.getPokemonById(id);

      expect(mockPokedexService.getPokemonById).toHaveBeenCalledWith(id);

      expect(mockPokedexService.getPokemonById).toHaveBeenCalledTimes(1);
    });
  });
});
