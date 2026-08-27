-- Run this once in YOUR Supabase project: SQL Editor → New query → Run
-- Project: ngukhgymeveuttokeavp

create table if not exists public.idioms (
  id integer primary key,
  word text not null unique,
  pinyin text,
  meaning text not null,
  english text,
  example text,
  clue text,
  synonyms text[] not null default '{}',
  antonyms text[] not null default '{}',
  sort_order integer not null default 0
);

create table if not exists public.ui_copy (
  key text primary key,
  body text not null
);

create table if not exists public.player_saves (
  user_id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.idioms enable row level security;
alter table public.ui_copy enable row level security;
alter table public.player_saves enable row level security;

drop policy if exists idioms_select_public on public.idioms;
create policy idioms_select_public on public.idioms
  for select to anon, authenticated using (true);

drop policy if exists ui_copy_select_public on public.ui_copy;
create policy ui_copy_select_public on public.ui_copy
  for select to anon, authenticated using (true);

drop policy if exists saves_select_own on public.player_saves;
drop policy if exists saves_insert_own on public.player_saves;
drop policy if exists saves_update_own on public.player_saves;
create policy saves_select_own on public.player_saves
  for select to authenticated using ((select auth.jwt() ->> 'sub') = user_id);
create policy saves_insert_own on public.player_saves
  for insert to authenticated with check ((select auth.jwt() ->> 'sub') = user_id);
create policy saves_update_own on public.player_saves
  for update to authenticated using ((select auth.jwt() ->> 'sub') = user_id)
  with check ((select auth.jwt() ->> 'sub') = user_id);

grant select on public.idioms, public.ui_copy to anon, authenticated;
grant select, insert, update on public.player_saves to authenticated;

insert into public.idioms (id, word, pinyin, meaning, english, example, clue, synonyms, antonyms, sort_order)
values
(1, E'山明水秀', E'shān míng shuǐ xiù', E'山水清麗、景色優美。', E'A picturesque landscape characterised by verdant mountains and limpid waters.', E'春日郊遊時，我們被眼前山明水秀的景色深深吸引。', E'春遊時遠望層巒疊翠、溪流清澈，該用哪個詞語？', ARRAY[E'湖光山色',E'青山綠水'], ARRAY[E'窮山惡水'], 1),
(2, E'青山綠水', E'qīng shān lǜ shuǐ', E'青翠的山嶺和碧綠的水，泛指美好的山河。', E'A tranquil natural setting of verdant hills and pristine waterways.', E'這座古村落被青山綠水環抱，宛如一幅天然畫卷。', E'村口兩側是蒼翠山巒，門前一條清溪緩緩流過。', ARRAY[E'山明水秀',E'碧波萬頃'], ARRAY[E'窮山惡水'], 2),
(3, E'湖光山色', E'hú guāng shān sè', E'湖上的風光和山間的景色。', E'The harmonious splendour of a lake reflecting the surrounding mountains.', E'傍晚的湖光山色與遠處的晚霞相互輝映，美不勝收。', E'傍晚坐在湖邊，倒影裡有遠山，晚霞鋪在水面上。', ARRAY[E'山明水秀',E'江山如畫'], ARRAY[E'荒山野嶺'], 3),
(4, E'水天一色', E'shuǐ tiān yī sè', E'水面和天空呈現同一種顏色，形容水天相接的景象。', E'A breathtaking vista in which the water and sky appear to merge seamlessly.', E'登上高峰遠眺，只見海面遼闊，水天一色。', E'出海遠眺，分不清哪裡是海、哪裡是天。', ARRAY[E'煙波浩渺',E'碧波萬頃'], ARRAY[E'天水相隔'], 4),
(5, E'錦繡河山', E'jǐn xiù hé shān', E'美好壯麗的國土山河。', E'A magnificent and richly endowed land, celebrated for its natural beauty.', E'我們應當珍惜祖國的錦繡河山，並努力守護自然環境。', E'從高空俯瞰大地，田野、江河與城市交織如錦。', ARRAY[E'江山如畫',E'名山大川'], ARRAY[E'滿目瘡痍'], 5),
(6, E'名山大川', E'míng shān dà chuān', E'著名的高山和大河，泛指壯麗的自然景觀。', E'Renowned mountains and majestic rivers, representing the grandeur of nature.', E'他遊歷各地的名山大川，逐漸開闊了自己的眼界。', E'他立志走遍各地的著名高峰與大江大河。', ARRAY[E'錦繡河山',E'江山如畫'], ARRAY[E'窮鄉僻壤'], 6),
(7, E'江山如畫', E'jiāng shān rú huà', E'山河美麗得像圖畫一樣。', E'A landscape of such exceptional beauty that it resembles a masterful painting.', E'站在山頂俯瞰群峰，眼前江山如畫，令人流連忘返。', E'登上城樓遠望，群山層疊、江水蜿蜒，像一幅山水畫。', ARRAY[E'錦繡河山',E'湖光山色'], ARRAY[E'荒蕪破敗'], 7),
(8, E'煙波浩渺', E'yān bō hào miǎo', E'水面煙霧迷濛、遼闊無邊的樣子。', E'An expansive body of water veiled in mist and extending beyond the visible horizon.', E'小舟在煙波浩渺的江面上緩緩前行，漸漸消失在霧色中。', E'江面晨霧未散，小船漸漸隱入茫茫水氣裡。', ARRAY[E'水天一色',E'碧波萬頃'], ARRAY[E'一清見底'], 8),
(9, E'波光粼粼', E'bō guāng lín lín', E'水波被陽光照射，閃閃發光。', E'Rippling water glittering with reflected light beneath the sun.', E'陽光灑在河面上，波光粼粼，像鋪滿了碎銀。', E'正午陽光灑在河面，水紋一閃一閃像碎銀。', ARRAY[E'碧波萬頃',E'水波蕩漾'], ARRAY[E'死水一潭'], 9),
(10, E'碧波萬頃', E'bì bō wàn qǐng', E'青綠色的水面廣闊無邊。', E'Vast, emerald-green expanses of water stretching as far as the eye can see.', E'放眼望去，碧波萬頃的海洋與蔚藍天空連成一片。', E'站在堤岸望去，綠色的水面一直延伸到天邊。', ARRAY[E'波光粼粼',E'青山綠水'], ARRAY[E'污水橫流'], 10),
(11, E'美不勝收', E'měi bù shèng shōu', E'美好的景物太多，看也看不完。', E'So abundant in beauty that it is impossible to appreciate every sight fully.', E'春天百花盛開，公園裡的景致美不勝收。', E'園裡四季花卉同時盛放，目光不知該停在哪一處。', ARRAY[E'引人入勝',E'賞心悅目'], ARRAY[E'不堪入目'], 11),
(12, E'別有洞天', E'bié yǒu dòng tiān', E'另有一番奇妙或優美的境界。', E'A remarkably enchanting realm revealed beyond an ordinary or concealed entrance.', E'穿過狹窄的山洞後，眼前竟是別有洞天的桃花谷。', E'穿過山洞後，竟出現一片隱藏的花谷。', ARRAY[E'洞天福地',E'另有天地'], ARRAY[E'平淡無奇'], 12),
(13, E'洞天福地', E'dòng tiān fú dì', E'神仙居住的地方，亦指風景優美的地方。', E'An idyllic and secluded haven blessed with extraordinary natural beauty.', E'這個依山傍水的小鎮環境清幽，真可稱得上洞天福地。', E'這座依山傍水的小鎮清幽安穩，像神仙居處。', ARRAY[E'世外桃源',E'別有洞天'], ARRAY[E'窮山惡水'], 13),
(14, E'詩情畫意', E'shī qíng huà yì', E'像詩畫所描繪的美好意境。', E'An atmosphere possessing the evocative charm and artistic beauty of poetry and painting.', E'雨後的江南小巷充滿詩情畫意，吸引許多攝影愛好者。', E'細雨灑在石板巷與烏篷船上，處處像詩句裡的畫面。', ARRAY[E'風花雪月',E'情景交融'], ARRAY[E'枯燥乏味'], 14),
(15, E'世外桃源', E'shì wài táo yuán', E'與世隔絕、安寧美好的理想地方。', E'An idyllic refuge removed from worldly disturbance and social pressures.', E'遠離城市喧囂的山村，仿佛是一處與世無爭的世外桃源。', E'這山村沒有車聲人潮，日子過得安穩寧靜。', ARRAY[E'洞天福地',E'人間仙境'], ARRAY[E'人間地獄'], 15),
(16, E'令人神往', E'lìng rén shén wǎng', E'使人心裡嚮往。', E'To inspire profound admiration and an irresistible desire to visit or experience it.', E'那片未被污染的海岸風光旖旎，早已令人神往。', E'聽完朋友描述那片海岸，大家心裡都想親自去一趟。', ARRAY[E'心嚮往之',E'夢寐以求'], ARRAY[E'望而卻步'], 16),
(17, E'引人入勝', E'yǐn rén rù shèng', E'吸引人進入美妙的境界。', E'To captivate an audience and draw them progressively into a fascinating experience.', E'導遊生動的介紹令這段古城歷史更加引人入勝。', E'導覽一路講故事，遊客不知不覺跟著走進最深處。', ARRAY[E'扣人心弦',E'引人入彀'], ARRAY[E'索然無味'], 17)
on conflict (id) do update set
  word = excluded.word,
  pinyin = excluded.pinyin,
  meaning = excluded.meaning,
  english = excluded.english,
  example = excluded.example,
  clue = excluded.clue,
  synonyms = excluded.synonyms,
  antonyms = excluded.antonyms,
  sort_order = excluded.sort_order;

insert into public.ui_copy (key, body) values
  ('hub.hero', '歡迎來到成語探險！這裡集合有趣又有挑戰性的互動遊戲，讓你在猜謎、配對和闖關之間，自然掌握更多成語。'),
  ('hub.about', '成語探險是一個給親子、學生和老師用的互動學習小站。每個遊戲圍繞一組成語：先用閃卡認識意思，再用連消和測驗練習。登入後進度可以同步到雲端。'),
  ('hub.card.landscape', '透過山水風光閃卡、動態直線連消和多元測驗，邊玩邊認識 17 個充滿畫面感的山水風光成語。還可以照顧小山靈、用金幣去干擾。'),
  ('game.subtitle', '山水精靈正跟著你學成語。')
on conflict (key) do update set body = excluded.body;
