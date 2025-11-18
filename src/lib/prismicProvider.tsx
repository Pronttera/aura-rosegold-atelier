import { PrismicProvider as BasePrismicProvider } from '@prismicio/react';
import { ReactNode, useMemo } from 'react';
import { createClient } from './prismic';

interface PrismicProviderProps {
  children: ReactNode;
}

export const PrismicProvider = ({ children }: PrismicProviderProps) => {
  const repositoryName = import.meta.env.VITE_PRISMIC_REPOSITORY_NAME;

  const client = useMemo(() => createClient(), []);

  return (
    <BasePrismicProvider client={client} repositoryName={repositoryName}>
      {children}
    </BasePrismicProvider>
  );
};
