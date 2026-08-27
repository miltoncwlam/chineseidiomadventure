import type { Metadata } from 'next';
import { LegalLayout } from '@/components/legal-layout';

export const metadata: Metadata = {
  title: '服務條款｜成語探險',
  description: '使用成語探險網站及遊戲的條款與條件。'
};

export default function TermsPage() {
  return (
    <LegalLayout title="服務條款">
      <p>
        歡迎使用成語探險（Chinese Idiom Adventure）。使用本網站（包括首頁及「山水風光」遊戲）即表示你同意以下條款。如不同意，請停止使用。
      </p>

      <section>
        <h2>1. 服務說明</h2>
        <p>
          成語探險提供互動成語學習內容，包括閃卡、連消遊戲、測驗及虛擬夥伴「小山靈」。部分功能需要網絡連線。登入帳戶為<strong>可選</strong>
          ；不登入亦可遊玩，但進度只會儲存在你的裝置。
        </p>
      </section>

      <section>
        <h2>2. 帳戶</h2>
        <ul>
          <li>帳戶由第三方服務 Clerk 提供；註冊時須遵守 Clerk 的服務條款。</li>
          <li>你須對帳戶下的活動負責，並妥善保管登入資料。</li>
          <li>我們可因維護、安全或法律原因暫停或終止帳戶存取。</li>
        </ul>
      </section>

      <section>
        <h2>3. 遊戲規則與虛擬物品</h2>
        <ul>
          <li>金幣、連勝、小山靈狀態、外觀等均為<strong>遊戲內虛擬項目</strong>，不具現金價值，不可兌換或轉讓。</li>
          <li>
            <strong>測驗進行中</strong>不得使用金幣購買重答、商店物品或其他付費式協助；此為學習公平規則的一部分。
          </li>
          <li>我們可調整遊戲平衡（例如金幣價格、獎勵），恕不另行通知；重大變更會盡力在網站說明。</li>
        </ul>
      </section>

      <section>
        <h2>4. 智慧財產權</h2>
        <h3 className="mt-4 font-black">我們的內容</h3>
        <ul>
          <li>
            網站介面、遊戲設計、CSS 動畫角色（小山靈）、原創例句、英文釋義、出題邏輯及整體編排，均屬成語探險專案或營運者所有，受著作權及其他法律保護。
          </li>
          <li>未經書面許可，不得複製、改作、公開傳播或作商業利用。</li>
        </ul>
        <h3 className="mt-4 font-black">成語與詞典資料</h3>
        <ul>
          <li>
            成語本身（如「山明水秀」）屬華語傳統詞彙，一般<strong>不受著作權保護</strong>。本站的拼音、中文釋義、例句及英文翻譯為<strong>
              教育用途而編撰
            </strong>
            ，並非抄錄自某一指定詞典；我們未聲稱獨占成語詞條的著作權。
          </li>
          <li>
            若你認為任何內容侵犯你的著作權，請聯絡我們並提供權利證明及具體網址，我們會在合理時間內審核並處理。
          </li>
        </ul>
        <h3 className="mt-4 font-black">第三方素材</h3>
        <ul>
          <li>
            遊戲頁使用 <strong>Noto Sans TC</strong>（Google Fonts，SIL Open Font License 1.1）、開源程式庫（Vue、Supabase JS 等）及
            Clerk 登入介面，各受其授權條款約束。
          </li>
          <li>介面中的 emoji 由你的裝置系統字型顯示。</li>
        </ul>
      </section>

      <section>
        <h2>5. 允許的使用方式</h2>
        <p>你同意不會：</p>
        <ul>
          <li>以自動化方式大量抓取內容或干擾伺服器；</li>
          <li>嘗試破解、逆向工程或繞過安全機制；</li>
          <li>利用漏洞不正當獲取遊戲資源；</li>
          <li>將本服務用於任何違法或侵害他人權利的目的。</li>
        </ul>
      </section>

      <section>
        <h2>6. 免責聲明</h2>
        <ul>
          <li>本服務按「現狀」提供，學習內容僅供參考，不構成專業語文或考試保證。</li>
          <li>我們不保證服務不間斷、無錯誤，亦不對第三方服務（Clerk、Supabase、CDN 等）的中斷負責。</li>
          <li>在法律允許的最大範圍內，我們不對因使用或無法使用本服務而產生的間接或附帶損害負責。</li>
        </ul>
      </section>

      <section>
        <h2>7. 私隱</h2>
        <p>
          我們如何處理個人資料，請參閱{' '}
          <a className="text-[var(--color-primary)] underline" href="/privacy">
            私隱政策
          </a>
          。
        </p>
      </section>

      <section>
        <h2>8. 條款變更</h2>
        <p>我們可更新本條款；更新後繼續使用即視為接受。重大變更會在本頁註明日期。</p>
      </section>

      <section>
        <h2>9. 適用法律</h2>
        <p>
          本條款受香港特別行政區法律管轄。如發生爭議，雙方應先友好協商；協商不成時，提交香港法院專屬管轄（除非法律另有強制規定）。
        </p>
      </section>
    </LegalLayout>
  );
}
