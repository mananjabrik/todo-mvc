import { createMachine } from 'xstate';

export const myFirsMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCeBZAhgYwBYEsA7MAOgHFMAjAVwBcBiAIQFEAlAZQEEA5AFU4CSiUAAcA9rHy18YwsJAAPRAEYAzAAYSATgBMAdnXLDADmPr964wBoQqRAFplAVlUlVWrQBYdhrcY1aqp4AvsE2aFh4RKTsYISYhFBMzADSbABSnPLiktKy8koI9jrGAGwkpcoennpmpWV6WjZ2RTo6JJ416u46nk66-n2hYSCEYhBw8hE4BMTkVHTZElIyckiKDjpa5YbqTsY+RvtVes0OzlokxtVtav2qD06h4Rgz0SSx8YlLuasFKjonBVKqo9E5SiCwaUmrZNsZtF1PMplP4nE4dKp9s8QNMosQfit8utCvZVD4SLt9oc9sYTmdWmSrtUNC4MepPHthsEgA */
  createMachine({
    initial: 'Gabut',
    states: {
      Gabut: {
        on: {
          BERSANTAI: {
            target: 'Senang',
          },
        },
      },
      Senang: {
        on: {
          BEKERJA: {
            target: 'Gabut',
          },
        },
      },
    },
    id: 'myMachine',
  });
