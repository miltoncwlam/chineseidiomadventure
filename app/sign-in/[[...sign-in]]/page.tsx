import { SignIn } from '@clerk/nextjs';
import { AuthScreen } from '@/components/auth-screen';
import { clerkAppearance } from '@/lib/clerk-appearance';

export default function SignInPage() {
  return (
    <AuthScreen title="登入同步進度" subtitle="登入後，小山靈與遊戲進度會儲存在雲端，方便你換裝置繼續玩。">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/"
        appearance={clerkAppearance}
      />
    </AuthScreen>
  );
}
