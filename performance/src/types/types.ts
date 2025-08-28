import z from 'zod';

export const yearSchema = z.object({
  year: z.number(),
  population: z.number().optional(),
  gdp: z.number().optional(),
  cement_co2: z.number().optional(),
  cement_co2_per_capita: z.number().optional(),
  co2: z.number().optional(),
  co2_growth_abs: z.number().optional(),
  co2_growth_prct: z.number().optional(),
  co2_including_luc: z.number().optional(),
  co2_including_luc_growth_abs: z.number().optional(),
  co2_including_luc_growth_prct: z.number().optional(),
  co2_including_luc_per_capita: z.number().optional(),
  co2_including_luc_per_gdp: z.number().optional(),
  co2_including_luc_per_unit_energy: z.number().optional(),
  co2_per_capita: z.number().optional(),
  co2_per_gdp: z.number().optional(),
  co2_per_unit_energy: z.number().optional(),
  coal_co2: z.number().optional(),
  coal_co2_per_capita: z.number().optional(),
  consumption_co2: z.number().optional(),
  consumption_co2_per_capita: z.number().optional(),
  consumption_co2_per_gdp: z.number().optional(),
  cumulative_cement_co2: z.number().optional(),
  cumulative_co2: z.number().optional(),
  cumulative_co2_including_luc: z.number().optional(),
  cumulative_coal_co2: z.number().optional(),
  cumulative_flaring_co2: z.number().optional(),
  cumulative_gas_co2: z.number().optional(),
  cumulative_luc_co2: z.number().optional(),
  cumulative_oil_co2: z.number().optional(),
  cumulative_other_co2: z.number().optional(),
  energy_per_capita: z.number().optional(),
  energy_per_gdp: z.number().optional(),
  flaring_co2: z.number().optional(),
  flaring_co2_per_capita: z.number().optional(),
  gas_co2: z.number().optional(),
  gas_co2_per_capita: z.number().optional(),
  ghg_excluding_lucf_per_capita: z.number().optional(),
  ghg_per_capita: z.number().optional(),
  land_use_change_co2: z.number().optional(),
  land_use_change_co2_per_capita: z.number().optional(),
  methane: z.number().optional(),
  methane_per_capita: z.number().optional(),
  nitrous_oxide: z.number().optional(),
  nitrous_oxide_per_capita: z.number().optional(),
  oil_co2: z.number().optional(),
  oil_co2_per_capita: z.number().optional(),
  other_co2_per_capita: z.number().optional(),
  other_industry_co2: z.number().optional(),
  primary_energy_consumption: z.number().optional(),
  share_global_cement_co2: z.number().optional(),
  share_global_co2: z.number().optional(),
  share_global_co2_including_luc: z.number().optional(),
  share_global_coal_co2: z.number().optional(),
  share_global_cumulative_cement_co2: z.number().optional(),
  share_global_cumulative_co2: z.number().optional(),
  share_global_cumulative_co2_including_luc: z.number().optional(),
  share_global_cumulative_coal_co2: z.number().optional(),
  share_global_cumulative_flaring_co2: z.number().optional(),
  share_global_cumulative_gas_co2: z.number().optional(),
  share_global_cumulative_luc_co2: z.number().optional(),
  share_global_cumulative_oil_co2: z.number().optional(),
  share_global_cumulative_other_co2: z.number().optional(),
  share_global_flaring_co2: z.number().optional(),
  share_global_gas_co2: z.number().optional(),
  share_global_luc_co2: z.number().optional(),
  share_global_oil_co2: z.number().optional(),
  share_global_other_co2: z.number().optional(),
  share_of_temperature_change_from_ghg: z.number().optional(),
  temperature_change_from_ch4: z.number().optional(),
  temperature_change_from_co2: z.number().optional(),
  temperature_change_from_ghg: z.number().optional(),
  temperature_change_from_n2o: z.number().optional(),
  total_ghg: z.number().optional(),
  total_ghg_excluding_lucf: z.number().optional(),
  trade_co2: z.number().optional(),
  trade_co2_share: z.number().optional(),
});
export const countrySchema = z.object({
  iso_code: z.string().optional(),
  data: z.array(yearSchema),
});
export const countriesSchema = z.record(z.string(), countrySchema);

// export type Co2DataState = {
//   countries: RawCountries;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error?: string;
// };

export type YearData = {
  year: number;
  population?: number;
  gdp?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
  co2?: number;
  co2_growth_abs?: number;
  co2_growth_prct?: number;
  co2_including_luc?: number;
  co2_including_luc_growth_abs?: number;
  co2_including_luc_growth_prct?: number;
  co2_including_luc_per_capita?: number;
  co2_including_luc_per_gdp?: number;
  co2_including_luc_per_unit_energy?: number;
  co2_per_capita?: number;
  co2_per_gdp?: number;
  co2_per_unit_energy?: number;
  coal_co2?: number;
  coal_co2_per_capita?: number;
  consumption_co2?: number;
  consumption_co2_per_capita?: number;
  consumption_co2_per_gdp?: number;
  cumulative_cement_co2?: number;
  cumulative_co2?: number;
  cumulative_co2_including_luc?: number;
  cumulative_coal_co2?: number;
  cumulative_flaring_co2?: number;
  cumulative_gas_co2?: number;
  cumulative_luc_co2?: number;
  cumulative_oil_co2?: number;
  cumulative_other_co2?: number;
  energy_per_capita?: number;
  energy_per_gdp?: number;
  flaring_co2?: number;
  flaring_co2_per_capita?: number;
  gas_co2?: number;
  gas_co2_per_capita?: number;
  ghg_excluding_lucf_per_capita?: number;
  ghg_per_capita?: number;
  land_use_change_co2?: number;
  land_use_change_co2_per_capita?: number;
  methane?: number;
  methane_per_capita?: number;
  nitrous_oxide?: number;
  nitrous_oxide_per_capita?: number;
  oil_co2?: number;
  oil_co2_per_capita?: number;
  other_co2_per_capita?: number;
  other_industry_co2?: number;
  primary_energy_consumption?: number;
  share_global_cement_co2?: number;
  share_global_co2?: number;
  share_global_co2_including_luc?: number;
  share_global_coal_co2?: number;
  share_global_cumulative_cement_co2?: number;
  share_global_cumulative_co2?: number;
  share_global_cumulative_co2_including_luc?: number;
  share_global_cumulative_coal_co2?: number;
  share_global_cumulative_flaring_co2?: number;
  share_global_cumulative_gas_co2?: number;
  share_global_cumulative_luc_co2?: number;
  share_global_cumulative_oil_co2?: number;
  share_global_cumulative_other_co2?: number;
  share_global_flaring_co2?: number;
  share_global_gas_co2?: number;
  share_global_luc_co2?: number;
  share_global_oil_co2?: number;
  share_global_other_co2?: number;
  share_of_temperature_change_from_ghg?: number;
  temperature_change_from_ch4?: number;
  temperature_change_from_co2?: number;
  temperature_change_from_ghg?: number;
  temperature_change_from_n2o?: number;
  total_ghg?: number;
  total_ghg_excluding_lucf?: number;
  trade_co2?: number;
  trade_co2_share?: number;
};

export type CountryData = {
  iso_code?: string;
  data: YearData[];
};

export type RawCountries = Record<string, CountryData>;
