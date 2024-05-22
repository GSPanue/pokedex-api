import { Test, TestingModule } from '@nestjs/testing';

import { PokedexService } from '../providers';
import { PokedexController } from './pokedex.controller';

describe('PokedexController', () => {
  let pokedexService: PokedexService;
  let pokedexController: PokedexController;

  const mockPokedexService = {
    getPokemon: jest.fn(),
    getPokemonById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokedexController],
      providers: [
        {
          provide: PokedexService,
          useValue: mockPokedexService,
        },
      ],
    }).compile();

    pokedexController = module.get<PokedexController>(PokedexController);
    pokedexService = module.get<PokedexService>(PokedexService);
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

      mockPokedexService.getPokemon = jest
        .fn()
        .mockResolvedValueOnce(pokemonArray);

      const res = await pokedexController.getPokemon();

      expect(res).toEqual(pokemonArray);
    });

    it('should return an empty array', async () => {
      const pokemonArray = [];

      mockPokedexService.getPokemon = jest
        .fn()
        .mockResolvedValueOnce(pokemonArray);

      const res = await pokedexController.getPokemon();

      expect(res).toEqual(pokemonArray);
    });

    it('should call getPokemon with default query parameters when none are provided', async () => {
      const query = {
        limit: 20,
        offset: 5,
        sort: 'name',
        order: 'desc',
      };

      await pokedexController.getPokemon(
        query.limit,
        query.offset,
        query.sort,
        query.order,
      );

      expect(pokedexService.getPokemon).toHaveBeenCalledWith({
        limit: query.limit,
        offset: query.offset,
        sort: query.sort,
        order: query.order,
      });
    });

    it('should call getPokemon with the provided query parameters', async () => {});
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

      mockPokedexService.getPokemonById = jest
        .fn()
        .mockResolvedValueOnce(pokemonArray);

      const res = await pokedexController.getPokemonById(id);

      expect(res).toEqual(pokemonArray);
    });

    it('should return an empty array', async () => {
      const pokemonArray = [];

      mockPokedexService.getPokemonById = jest
        .fn()
        .mockResolvedValueOnce(pokemonArray);

      const res = await pokedexController.getPokemonById(1);

      expect(res).toEqual(pokemonArray);
    });
  });
});
