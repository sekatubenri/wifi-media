const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SITE = {
  name: 'ネット回線ナビ',
  url: 'https://wifi-media-eta.vercel.app',
};

const AFFILIATE_TOP = `
<div style="background:#f0f7ff;border:2px solid #2563eb;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#1e40af;margin:0 0 8px;">【PR】キャッシュバック9万円以上！おすすめ光回線</p>
  <a href="//af.moshimo.com/af/c/click?a_id=5664427&p_id=7176&pc_id=20551&pl_id=90380" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">【9万円以上のキャッシュバックあり】高速光回線『AsahiNet 光（クロスコース）』</a>
  <img src="//i.moshimo.com/af/i/impression?a_id=5664427&p_id=7176&pc_id=20551&pl_id=90380" width="1" height="1" style="border:none;" loading="lazy">
</div>`;

const AFFILIATE_BOTTOM = `
<div style="background:#fff7ed;border:2px solid #ea580c;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#c2410c;margin:0 0 8px;">【PR】eSIM・SIM・WiFiレンタルなら</p>
  <a href="//af.moshimo.com/af/c/click?a_id=5664438&p_id=5538&pc_id=15178&pl_id=73675" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" style="display:inline-block;background:#ea580c;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">dinomoWiFi｜30日間無料お試し</a>
  <img src="//i.moshimo.com/af/i/impression?a_id=5664438&p_id=5538&pc_id=15178&pl_id=73675" width="1" height="1" style="border:none;" loading="lazy">
</div>
<div style="background:#fdf4ff;border:2px solid #9333ea;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#7e22ce;margin:0 0 8px;">【PR】海外から日本のテレビ・動画を視聴するなら</p>
  <a href="//af.moshimo.com/af/c/click?a_id=5664439&p_id=4914&pc_id=13098&pl_id=64879" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" style="display:inline-block;background:#9333ea;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">Rakulink｜日本VPNで海外から日本のテレビが見られる</a>
  <img src="//i.moshimo.com/af/i/impression?a_id=5664439&p_id=4914&pc_id=13098&pl_id=64879" width="1" height="1" style="border:none;" loading="lazy">
</div>`;

async function generateArticle() {
  const topicsPath = path.join(__dirname, '..', 'unused-topics.json');
  const contentDir = path.join(__dirname, '..', 'content');

  const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf-8'));
  const existingFiles = new Set(fs.readdirSync(contentDir));

  const topic = topics.find(t => !existingFiles.has(t.filename));
  if (!topic) {
    console.log('全トピック生成完了');
    process.exit(0);
  }

  console.log(`生成中: ${topic.title}`);

  const today = new Date().toISOString().split('T')[0];

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `あなたはネット回線比較メディア「${SITE.name}」の専門ライターです。
SEOに最適化されたインターネット回線・WiFi情報記事を生成してください。

トピック: ${topic.title}
カテゴリ: ${topic.category}

以下のJSON形式のみで出力してください（前後に余分なテキスト不要）:
{
  "title": "タイトル（SEO最適化、40〜60文字、年や具体的な数字を含める）",
  "description": "メタディスクリプション（120文字以内）",
  "category": "${topic.category}",
  "date": "${today}",
  "content": "HTMLコンテンツ"
}

contentの要件:
- 2500文字以上のHTML本文
- h2見出しを5〜8個、必要に応じてh3も使用
- ul/ol/liリスト、tableを積極的に活用
- 料金・速度・キャッシュバックなど具体的な数字を含める
- 読者が回線選びで迷わない実践的な比較内容
- JSON文字列として正しくエスケープ（"は\\"、改行は\\n）`
    }],
  });

  const text = message.content[0].text.trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('レスポンスにJSONが見つかりません');

  const article = JSON.parse(jsonMatch[0]);

  // アフィリエイトリンクを挿入
  if (article.content.includes('<h2')) {
    article.content = article.content.replace('<h2', AFFILIATE_TOP + '<h2');
  } else {
    article.content = AFFILIATE_TOP + article.content;
  }
  article.content = article.content + AFFILIATE_BOTTOM;

  fs.writeFileSync(
    path.join(contentDir, topic.filename),
    JSON.stringify(article, null, 2)
  );

  const remaining = topics.filter(t => t.filename !== topic.filename);
  fs.writeFileSync(topicsPath, JSON.stringify(remaining, null, 2));

  console.log(`完了: ${topic.filename}`);
}

generateArticle().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
