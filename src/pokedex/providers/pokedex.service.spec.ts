import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Pokemon } from '@entities';
import { calculateSkip } from '@common';
import { PokedexService } from './pokedex.service';
import { transformToPokemonArray, createOrderObject } from '../utils';

import type { IPokedexService, IPokemon } from '../interfaces';

jest.mock('@common', () => ({
  calculateSkip: jest.fn(),
}));

jest.mock('../utils', () => ({
  transformToPokemonArray: jest.fn(),
  createOrderObject: jest.fn(),
}));

describe('PokedexService', () => {
  let pokedexService: IPokedexService;
  let pokemonRepository: Repository<Pokemon>;

  const mockPokemon: Pokemon = {
    id: 1,
    pokedex_id: 1,
    name_id: 1,
    name: {
      id: 1,
      name: 'a',
      japanese_name: {
        id: 1,
        name: 'a',
      },
      german_name: {
        id: 1,
        name: 'a',
      },
    },
    generation: {
      id: 1,
      number: 1,
    },
    rarity: {
      id: 1,
      level: 'a',
    },
    species: {
      id: 1,
      name: 'a',
    },
    type_1: {
      id: 1,
      element: 'a',
    },
    type_2: {
      id: 2,
      element: 'b',
    },
    height: {
      id: 1,
      metres: 1,
    },
    weight: {
      id: 1,
      kg: 1,
    },
    ability_1: {
      id: 1,
      name: 'a',
    },
    ability_2: {
      id: 2,
      name: 'b',
    },
    ability_hidden: {
      id: 3,
      name: 'c',
    },
  };

  const mockPokemonArray: Pokemon[] = [mockPokemon];
  const mockTransformedPokemonArray: IPokemon[] = [
    {
      id: 1,
      name: 'a',
      german_name: 'a',
      japanese_name: 'a',
      generation: 1,
      rarity: 'a',
      species: 'a',
      abilities: {
        ability_1: 'a',
        ability_2: 'b',
        ability_hidden: 'c',
      },
      types: {
        type_1: 'a',
        type_2: 'b',
      },
      height: {
        value: 1,
        unit: 'metres',
      },
      weight: {
        value: 1,
        unit: 'kg',
      },
    },
  ];

  const mockPokemonRepository = {
    findAndCount: jest.fn().mockResolvedValue([mockPokemonArray, 1]),
  };

  let mockCalculateSkip;
  let mockCreateOrderObject;
  let mockTransformToPokemonArray;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokedexService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: mockPokemonRepository,
        },
      ],
    }).compile();

    pokedexService = module.get<PokedexService>(PokedexService);
    pokemonRepository = module.get<Repository<Pokemon>>(
      getRepositoryToken(Pokemon),
    );

    mockCalculateSkip = (calculateSkip as jest.Mock).mockReturnValue(0);

    mockCreateOrderObject = (createOrderObject as jest.Mock).mockReturnValue(
      {},
    );

    mockTransformToPokemonArray = (
      transformToPokemonArray as jest.Mock
    ).mockReturnValue(mockTransformedPokemonArray);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(pokedexService).toBeDefined();
  });

  describe('getPokemon', () => {
    it('should calculate the skip', async () => {
      const query = {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      };

      await pokedexService.getPokemon(query);

      expect(mockCalculateSkip).toHaveBeenCalledWith(10, 0);
      expect(mockCalculateSkip).toHaveBeenCalledTimes(1);
    });

    it('should find and count the results', async () => {
      const query = {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      };

      await pokedexService.getPokemon(query);

      expect(pokemonRepository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        order: {},
      });
      expect(pokemonRepository.findAndCount).toHaveBeenCalledTimes(1);
    });

    it('should create an order object', async () => {
      const query = {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      };

      await pokedexService.getPokemon(query);

      expect(mockCreateOrderObject).toHaveBeenCalledWith('name', 'asc');
      expect(mockCreateOrderObject).toHaveBeenCalledTimes(1);
    });

    it('should transform the results', async () => {
      const query = {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      };

      await pokedexService.getPokemon(query);

      expect(mockTransformToPokemonArray).toHaveBeenCalledWith(
        mockPokemonArray,
      );
      expect(mockTransformToPokemonArray).toHaveBeenCalledTimes(1);
    });

    it('should return an object', async () => {
      const query = {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      };

      const res = await pokedexService.getPokemon(query);

      expect(res).toHaveProperty('results');
      expect(res).toHaveProperty('count');

      expect(res).toEqual({
        results: mockTransformedPokemonArray,
        count: 1,
      });
    });

    it('should have an array assigned to results', async () => {
      const query = {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      };

      const res = await pokedexService.getPokemon(query);

      expect(res.results).toEqual(mockTransformedPokemonArray);
    });

    it('should have a number assigned to count', async () => {
      const query = {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      };

      const res = await pokedexService.getPokemon(query);

      expect(res.count).toEqual(1);
    });
  });
});
