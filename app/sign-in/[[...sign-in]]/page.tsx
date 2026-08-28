import { AuthScreen } from '@/components/auth-screen';
import { SignInPanel } from '@/components/sign-in-panel';

export default function SignInPage() {
  return (
    <AuthScreen title="登入同步進度" subtitle="登入後，小山靈與遊戲進度會儲存在雲端，方便你換裝置繼續玩。">
      <SignInPanel />
    </AuthScreen>
  );
}
