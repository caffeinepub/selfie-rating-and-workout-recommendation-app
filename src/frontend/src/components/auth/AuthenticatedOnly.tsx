import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { ReactNode } from 'react';

interface AuthenticatedOnlyProps {
  children: ReactNode;
}

export default function AuthenticatedOnly({ children }: AuthenticatedOnlyProps) {
  const { identity } = useInternetIdentity();

  if (!identity) {
    return null;
  }

  return <>{children}</>;
}
