import { Suspense } from 'react';
import LoginContent from './LoginContent';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
