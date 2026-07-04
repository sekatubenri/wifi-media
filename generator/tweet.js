const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

async function postTweet() {
  const tweetsPath = path.join(__dirname, '..', 'tweets.md');
  const progressPath = path.join(__dirname, '..', 'tweet-index.json');

  const content = fs.readFileSync(tweetsPath, 'utf-8');
  const parts = content.split(/\n## Day \d+\n/).slice(1);
  const tweets = parts.map(t => t.trim());

  let index = 0;
  if (fs.existsSync(progressPath)) {
    const progress = JSON.parse(fs.readFileSync(progressPath, 'utf-8'));
    index = progress.next || 0;
  }

  if (index >= tweets.length) {
    console.log('全ツイート投稿完了');
    process.exit(0);
  }

  const text = tweets[index];
  console.log(`Day ${index + 1} を投稿します（${text.length}文字）`);

  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  const result = await client.v2.tweet(text);
  console.log('投稿完了:', result.data.id);

  fs.writeFileSync(
    progressPath,
    JSON.stringify({ next: index + 1, lastPosted: new Date().toISOString() }, null, 2)
  );
}

postTweet().catch(err => {
  console.error('エラー:', err.message);
  process.exit(1);
});
