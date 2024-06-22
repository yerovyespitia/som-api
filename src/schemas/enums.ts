import { z } from 'zod'

export const stateSchema = z.enum([
  'Unknown',
  'Perfect',
  'Playable',
  'Unplayable',
  'Broken',
])

export const layerSchema = z.enum([
  'Native',
  'Rosetta 2',
  'Crossover',
  'Parallels',
  'VMware',
  'PlayCover',
  'Emulator',
  'GPTK',
  'Other',
])

export const launcherSchema = z.enum([
  'Steam',
  'Epic Games',
  'Heroic',
  'Rockstar',
  'Riot Client',
  'Battle.net',
  'None',
  'Other',
])

export const macSchema = z.enum([
  'MacBook Pro M1 2020',
  'MacBook Air M1 2020',
  'Mac mini M1 2020',
  'iMac M1 2021',
  'MacBook Pro M1 Pro 2021',
  'MacBook Pro M1 Max 2021',
  'Mac Studio M1 Max 2022',
  'Mac Studio M1 Ultra 2022',
  'MacBook Air M2 2022',
  'Macbook Pro M2 2022',
  'Mac mini M2 2023',
  'Mac mini M2 Pro 2023',
  'Macbook Pro M2 Pro 2023',
  'Macbook Pro M2 Max 2023',
  'MacBook Pro M3 2023',
  'MacBook Pro M3 Pro 2023',
  'MacBook Pro M3 Max 2023',
  'iMac M3 2023',
  'MacBook Air M3 2024',
])
