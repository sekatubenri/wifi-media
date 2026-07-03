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
  <p style="font-weight:bold;color:#1e40af;margin:0 0 8px;">【PR】おすすめ回線・WiFiサービス</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="//af.moshimo.com/af/c/click?a_id=5664427&p_id=7176&pc_id=20551&pl_id=90380" rel="nofollow" referrerpolicy="no-referrer-when-downgrade" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ キャッシュバック9万円以上！AsahiNet 光（クロスコース）</a><img src="//i.moshimo.com/af/i/impression?a_id=5664427&p_id=7176&pc_id=20551&pl_id=90380" width="1" height="1" style="border:none;" loading="lazy"></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+24SYL6+3MKA+TRVYQ" rel="nofollow" style="display:inline-block;background:#0891b2;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 無制限WiMAXレンタル 法人プラン【FreeMax+5G】</a><img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4B648L+24SYL6+3MKA+TRVYQ" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+2HWHWA+3MKA+NTJWY" rel="nofollow" style="display:inline-block;background:#0e7490;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ データ容量制限なし！個人向け【FreeMax+5G】</a><img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4B648L+2HWHWA+3MKA+NTJWY" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+G69Z6I+1MWA+HWAG2" rel="nofollow" style="display:inline-block;background:#1e40af;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 0円で始める法人携帯・初期費用全額負担【法人携帯ドットコム】</a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4B648L+G69Z6I+1MWA+HWAG2" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+G0X2QI+1MWA+15Q9SI" rel="nofollow" style="display:inline-block;background:#374151;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 電話加入権は0円でいいんです！</a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4B648L+G0X2QI+1MWA+15Q9SI" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+F3KSUY+2BZM+354SDE" rel="nofollow" style="display:inline-block;background:#166534;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 法人・店舗向けWi-Fi【BizAir】</a><img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=4B648L+F3KSUY+2BZM+354SDE" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+EKIXI2+3SPO+BQPZ82" rel="nofollow" style="display:inline-block;background:#b45309;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 超高速インターネット1年間月額980円〜【コミュファ光】</a><img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4B648L+EKIXI2+3SPO+BQPZ82" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+D8ASQA+1MWA+2Z68LU" rel="nofollow" style="display:inline-block;background:#dc2626;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 光インターネット回線【NTTフレッツ光】</a><img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4B648L+D8ASQA+1MWA+2Z68LU" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+D5X32Y+1MWA+1TMEAQ" rel="nofollow" style="display:inline-block;background:#be123c;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ フレッツ光でインターネット＋電話をまとめて手配</a><img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4B648L+D5X32Y+1MWA+1TMEAQ" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+3FU7DM+348K+44UKYA" rel="nofollow" style="display:inline-block;background:#0f766e;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 工事不要・設定0円のホームルーター【おきらくホームWi-Fi】</a><img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4B648L+3FU7DM+348K+44UKYA" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+32QO2I+50+7LVLZM" rel="nofollow" style="display:inline-block;background:#1d4ed8;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 工事不要Wi-Fi新登場！【GMOとくとくBBホームWi-Fi】</a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4B648L+32QO2I+50+7LVLZM" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+2Z62FU+4MTU+5Z6WY" rel="nofollow" style="display:inline-block;background:#cc6600;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ コンセントを差すだけ！工事不要！【SoftBank Air】</a><img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4B648L+2Z62FU+4MTU+5Z6WY" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+169TI2+5NG6+5YJRM" rel="nofollow" style="display:inline-block;background:#7c3aed;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 海外旅行をスマホ一つで快適に【TORA eSIM】</a><img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4B648L+169TI2+5NG6+5YJRM" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+1JYSEY+55CI+BWVTE" rel="nofollow" style="display:inline-block;background:#374151;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 契約不要・すぐ使えるUSB型スティックWi-Fi【ecoco】</a><img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4B648L+1JYSEY+55CI+BWVTE" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+1DF0RE+2ZBM+TS3OI" rel="nofollow" style="display:inline-block;background:#cc6600;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 日本国内専用SoftBankレンタルWi-Fiルーター</a><img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=4B648L+1DF0RE+2ZBM+TS3OI" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+N7Y56+4ATM+BWVTE" rel="nofollow" style="display:inline-block;background:#059669;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 縛りなし！業界最安級のレンタルSIM・Wi-Fi【ファストSIM-WiFi】</a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4B648L+N7Y56+4ATM+BWVTE" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+LFMK2+47FO+5ZMCI" rel="nofollow" style="display:inline-block;background:#0369a1;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 業界最安級の月額1,980円！【縛りなしWiFi】</a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4B648L+LFMK2+47FO+5ZMCI" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+HV1P6+5HZI+5Z6WY" rel="nofollow" style="display:inline-block;background:#6d28d9;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 充電・返却不要！海外旅行なら【JAPAN &amp; GLOBAL eSIM】</a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4B648L+HV1P6+5HZI+5Z6WY" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+RDZDM+57X0+5YJRM" rel="nofollow" style="display:inline-block;background:#0891b2;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 月額・契約期間なし！チャージ式WiFi【ネオチャージWiFi】</a><img border="0" width="1" height="1" src="https://www12.a8.net/0.gif?a8mat=4B648L+RDZDM+57X0+5YJRM" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648L+APUFU+47FO+HV7V6" rel="nofollow" style="display:inline-block;background:#475569;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 最短当日発送！1日430円〜【縛りなしWiFi 短期レンタル】</a><img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4B648L+APUFU+47FO+HV7V6" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648K+CEJ4HE+50+3H3TCI" rel="nofollow" style="display:inline-block;background:#15803d;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 工事不要！最新Wi-Fiルーター月額770円〜【GMOとくとくBB WiMAX +5G】</a><img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4B648K+CEJ4HE+50+3H3TCI" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648K+BCFDRM+42Y0+60OXE" rel="nofollow" style="display:inline-block;background:#ea580c;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 初期工事費実質0円！最大41,250円割引【auひかり】</a><img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4B648K+BCFDRM+42Y0+60OXE" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648K+BB8IK2+50+54MIOY" rel="nofollow" style="display:inline-block;background:#dc2626;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ IPv6対応・最大1Gbps！速いドコモ光【GMOとくとくBBのドコモ光】</a><img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4B648K+BB8IK2+50+54MIOY" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648K+AQECDU+3SPO+7LVTPE" rel="nofollow" style="display:inline-block;background:#7c3aed;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 最大40,000円キャッシュバック！【BIGLOBE光】</a><img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4B648K+AQECDU+3SPO+7LVTPE" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648K+9SGMWI+4PB0+BZ8OY" rel="nofollow" style="display:inline-block;background:#b45309;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 最大79,000円キャッシュバック！【フレッツ光】</a><img border="0" width="1" height="1" src="https://www11.a8.net/0.gif?a8mat=4B648K+9SGMWI+4PB0+BZ8OY" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648K+AF33W2+447K+BZ0Z6" rel="nofollow" style="display:inline-block;background:#0369a1;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ サクサク快適インターネット【＠nifty光】</a><img border="0" width="1" height="1" src="https://www10.a8.net/0.gif?a8mat=4B648K+AF33W2+447K+BZ0Z6" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648K+A5K67M+4SHG+5YJRM" rel="nofollow" style="display:inline-block;background:#059669;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 複雑な条件なし！契約期間しばりなし光回線【おてがる光】</a><img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4B648K+A5K67M+4SHG+5YJRM" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648K+9MIAUQ+3SPO+CKHNGY" rel="nofollow" style="display:inline-block;background:#e11d48;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 安定した光回線をコスパ良く【ahamo光】</a><img border="0" width="1" height="1" src="https://www19.a8.net/0.gif?a8mat=4B648K+9MIAUQ+3SPO+CKHNGY" alt=""></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=4B648K+9HQU0I+1QFI+354SDE" rel="nofollow" style="display:inline-block;background:#374151;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 最低利用期間も違約金もなし！【DTI 光】</a><img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=4B648K+9HQU0I+1QFI+354SDE" alt=""></li>
  </ul>
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
</div>
<div style="background:#fffbeb;border:2px solid #d97706;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#92400e;margin:0 0 12px;">📦 Amazonで人気のWi-Fiルーター</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="https://www.amazon.co.jp/dp/B0F5B69SKC?linkCode=ll2&tag=mirainikibouw-22&linkId=26a086c577f44e78da80ee136577bc76&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ バッファロー Wi-Fi 7 ルーター WSR3600BE4P【Amazon】</a></li>
    <li><a href="https://www.amazon.co.jp/dp/B0DDXYJG4W?linkCode=ll2&tag=mirainikibouw-22&linkId=eae365992cded8cf53ef1c30e18e6592&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ TP-Link Archer AX3000V Wi-Fi 6 ルーター【Amazon】</a></li>
    <li><a href="https://www.amazon.co.jp/dp/B0DM8PTZS1?linkCode=ll2&tag=mirainikibouw-22&linkId=c92deb0c28c33ab88c5c83de2a0a278e&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ ASUS RT-BE92U Wi-Fi 7 ルーター【Amazon】</a></li>
  </ul>
</div>
<div style="background:#f0fdf4;border:2px solid #16a34a;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#15803d;margin:0 0 8px;">【PR】法人・店舗向け 工事不要の5G対応Wi-Fi</p>
  <a href="https://t.afi-b.com/visit.php?a=p14724Z-O4815629&p=39862071" rel="nofollow" style="display:inline-block;background:#16a34a;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">BizAir｜工事不要・即日開通の法人5G Wi-Fi</a>
  <img src="https://t.afi-b.com/lead/p14724Z/39862071/O4815629" width="1" height="1" style="border:none;" />
</div>
<div style="background:#fff0f0;border:2px solid #e00;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#c00;margin:0 0 12px;">🛒 楽天で人気のWi-Fiルーター</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="https://hb.afl.rakuten.co.jp/ichiba/5570f8cd.82e98484.5570f8ce.5b744630/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Ftplinkdirect%2F1210002601702%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="color:#c00;text-decoration:underline;">▶ TP-Link Archer BE260 Wi-Fi 7 ルーター【楽天】</a></li>
    <li><a href="https://hb.afl.rakuten.co.jp/ichiba/5570f8cd.82e98484.5570f8ce.5b744630/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fetre%2F1290719%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="color:#c00;text-decoration:underline;">▶ バッファロー WSR3600BE4P/DBK Wi-Fi 7 ルーター【楽天】</a></li>
    <li><a href="https://hb.afl.rakuten.co.jp/ichiba/5570f8cd.82e98484.5570f8ce.5b744630/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbiccamera%2F4981254066553%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0Iiwic2l6ZSI6IjI0MHgyNDAiLCJuYW0iOjEsIm5hbXAiOiJyaWdodCIsImNvbSI6MSwiY29tcCI6ImRvd24iLCJwcmljZSI6MSwiYm9yIjoxLCJjb2wiOjEsImJidG4iOjEsInByb2QiOjAsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="color:#c00;text-decoration:underline;">▶ BUFFALO WXR-11000XE12 Wi-Fi 7 ルーター【楽天】</a></li>
  </ul>
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
