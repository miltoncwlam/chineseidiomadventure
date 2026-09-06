import { AuthScreen } from '@/components/auth-screen';
import { SignUpPanel } from '@/components/sign-up-panel';

export default function SignUpPage() {
  return (
    <AuthScreen
      title="建立帳戶"
      subtitle="註冊後即可同步遊戲進度。你也可以不註冊，直接以訪客身份遊玩。"
      switchHref="/sign-in"
      switchLabel="已有帳戶？登入"
    >
      <SignUpPanel />
    </AuthScreen>
  );
}
