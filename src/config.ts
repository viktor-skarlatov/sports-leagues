import * as yup from 'yup'

// Injected at build time from the .env file (see vite.config.ts).
declare const __APP_ENV__: Record<string, string>;

const envSchema = yup.object({
  BASE_URL: yup.string().url().required(),
});

export type Config = yup.InferType<typeof envSchema>;

export const CONFIG: Config = envSchema.validateSync(__APP_ENV__, {
  abortEarly: false,
  stripUnknown: true,
});
