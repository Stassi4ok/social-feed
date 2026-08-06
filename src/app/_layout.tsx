import { Stack } from 'expo-router';
import { QueryProvider } from '../query/QueryProvider';

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack />
    </QueryProvider>
  );
}