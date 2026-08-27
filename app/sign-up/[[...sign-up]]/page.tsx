import { SignUp } from '@clerk/nextjs';
import { AuthScreen } from '@/components/auth-screen';
import { clerkAppearance } from '@/lib/clerk-appearance';

export default function SignUpPage() {
  return (
    <AuthScreen title="建立帳戶" subtitle="註冊後即可同步遊戲進度。你也可以不註冊，直接以訪客身份遊玩。">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/"
        appearance={clerkAppearance}
      />
    </AuthScreen>
  );
}
