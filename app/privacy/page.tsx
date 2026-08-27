import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';

export const metadata: Metadata = {
  title: '私隱政策｜成語探險',
  description: '成語探險如何收集、使用及保護你的資料。'
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="私隱政策">
      <p>
        成語探險（Chinese Idiom Adventure，網址 <strong>chineseidiom.vercel.app</strong>
        ）是一個供親子、學生及老師使用的互動成語學習網站。本政策說明我們如何處理與你有關的資料。
      </p>

      <section>
        <h2>1. 營運者</h2>
        <p>
          本網站由成語探險專案營運。如對私隱有疑問，可透過你註冊帳戶時使用的電郵服務供應商聯絡我們，或於 GitHub 專案
          <strong> chineseidiomadventure</strong> 提出查詢。
        </p>
      </section>

      <section>
        <h2>2. 我們收集哪些資料</h2>
        <h3 className="mt-4 font-black">訪客（不登入）</h3>
        <ul>
          <li>
            <strong>裝置本地資料：</strong>遊戲進度（金幣、連勝、小山靈狀態、已掌握成語等）會儲存在你瀏覽器的
            <code className="rounded bg-black/5 px-1">localStorage</code>（鍵名
            <code className="rounded bg-black/5 px-1">chengyu-shanshui-v1</code>），不會自動上傳。
          </li>
          <li>
            <strong>技術紀錄：</strong>託管平台（Vercel）及內容傳遞網絡可能記錄 IP 位址、瀏覽器類型、請求時間等一般伺服器日誌，供維運及安全用途。
          </li>
        </ul>
        <h3 className="mt-4 font-black">已登入用戶</h3>
        <ul>
          <li>
            <strong>帳戶資料（經 Clerk）：</strong>例如電郵地址、姓名、Clerk 用戶識別碼，以及登入工作階段所需的 Cookie。
          </li>
          <li>
            <strong>遊戲存檔（經 Supabase）：</strong>與本地存檔相同的遊戲狀態 JSON，連同你的 Clerk 用戶 ID 及最後更新時間，儲存在
            <code className="rounded bg-black/5 px-1">player_saves</code> 資料表。
          </li>
        </ul>
        <p className="mt-3">
          我們<strong>不會</strong>要求你提交測驗逐題答案、聊天內容、相片或其他社交內容。測驗回顧僅在當次瀏覽工作階段中顯示，不會寫入雲端存檔。
        </p>
      </section>

      <section>
        <h2>3. 我們如何使用資料</h2>
        <ul>
          <li>提供登入、登出及跨裝置同步遊戲進度；</li>
          <li>顯示成語內容及網站文案；</li>
          <li>維持網站安全、除錯及改善服務。</li>
        </ul>
        <p className="mt-3">
          我們<strong>不使用</strong>你的資料作定向廣告，亦<strong>未安裝</strong> Google Analytics、Mixpanel 等第三方分析工具。
        </p>
      </section>

      <section>
        <h2>4. 第三方服務（代處理者）</h2>
        <p>為營運網站，我們使用以下服務，它們可能在你使用本網站時處理資料：</p>
        <ul>
          <li>
            <strong>Clerk</strong> — 帳戶註冊與登入（
            <a className="text-[var(--color-primary)] underline" href="https://clerk.com/privacy" rel="noopener noreferrer">
              私隱政策
            </a>
            ）
          </li>
          <li>
            <strong>Supabase</strong> — 成語資料庫及已登入用戶的遊戲存檔（
            <a className="text-[var(--color-primary)] underline" href="https://supabase.com/privacy" rel="noopener noreferrer">
              私隱政策
            </a>
            ）
          </li>
          <li>
            <strong>Vercel</strong> — 網站託管（
            <a className="text-[var(--color-primary)] underline" href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer">
              私隱政策
            </a>
            ）
          </li>
          <li>
            <strong>jsDelivr、unpkg</strong> — 在遊戲頁載入開源程式庫（Vue、Supabase 客戶端、confetti 等）
          </li>
          <li>
            <strong>Tailwind CSS CDN</strong> — 遊戲頁樣式
          </li>
          <li>
            <strong>Google Fonts</strong> — 遊戲頁載入 Noto Sans TC 字型
          </li>
          <li>
            <strong>瀏覽器語音合成（Web Speech API）</strong> — 若你點擊「廣東話／普通話」發音，成語文字會由裝置或瀏覽器內建語音處理，我們不會另設伺服器錄音。
          </li>
        </ul>
        <p className="mt-3">
          上述服務的伺服器可能位於香港以外（例如美國或歐盟）。使用本網站即表示你知悉資料可能被傳送至該等地區，並受當地法律及該服務供應商政策規管。
        </p>
      </section>

      <section>
        <h2>5. Cookie</h2>
        <p>
          首頁及登入頁使用 Clerk 設定的 Cookie 以維持登入狀態。訪客玩遊戲時，若在同一網域已登入，Clerk 亦可能讀取相關
          Cookie。我們沒有另行設置行銷或追蹤 Cookie。
        </p>
      </section>

      <section>
        <h2>6. 兒童與家庭使用</h2>
        <p>
          本網站面向親子及學生，但<strong>不會主動收集 13 歲以下兒童的個人資料</strong>。未成年人可在<strong>不註冊帳戶</strong>
          的情況下以訪客身份遊玩；此時資料主要留在你的裝置上。
        </p>
        <p className="mt-3">
          若家長或監護人允許子女建立帳戶以同步進度，請由成人監督註冊流程，並確認你同意本政策及 Clerk、Supabase 的條款。如你認為我們在不知情下持有兒童的帳戶資料，請聯絡我們要求刪除。
        </p>
      </section>

      <section>
        <h2>7. 資料保留與刪除</h2>
        <ul>
          <li>
            <strong>本地存檔：</strong>你可隨時在瀏覽器設定中清除網站資料或
            <code className="rounded bg-black/5 px-1">localStorage</code>。
          </li>
          <li>
            <strong>雲端存檔：</strong>在你登入期間會保留，直至你刪除帳戶或我們依法刪除。你可透過 Clerk 帳戶設定刪除帳戶；刪除後請聯絡我們一併清除
            Supabase 中的遊戲存檔（我們會在合理時間內處理）。
          </li>
        </ul>
      </section>

      <section>
        <h2>8. 你的權利</h2>
        <p>
          視乎你所在地法律（例如香港《個人資料（私隱）條例》或歐盟 GDPR），你可能享有查閱、更正、刪除或限制處理個人資料的權利。請透過上文聯絡方式提出申請。
        </p>
      </section>

      <section>
        <h2>9. 政策更新</h2>
        <p>我們可能不時更新本政策；重大變更會在本頁註明更新日期。繼續使用網站即表示你接受修訂後的版本。</p>
        <p className="mt-3">
          使用本網站亦受{' '}
          <a className="text-[var(--color-primary)] underline" href="/terms">
            服務條款
          </a>{' '}
          約束。
        </p>
      </section>
    </LegalLayout>
  );
}
