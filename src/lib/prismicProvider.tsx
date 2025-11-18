import { PrismicProvider as BasePrismicProvider } from '@prismicio/react';
import { ReactNode } from 'react';
import { createClient } from './prismic';

/**
 * Prismic Provider Component
 * 
 * Wraps your application to provide Prismic context to all child components.
 * This enables the use of Prismic hooks throughout your app.
 */

interface PrismicProviderProps {
  children: ReactNode;
}

export const PrismicProvider = ({ children }: PrismicProviderProps) => {
  const client = createClient();

  return (
    <BasePrismicProvider client={client}>
      {children}
    </BasePrismicProvider>
  );
};
