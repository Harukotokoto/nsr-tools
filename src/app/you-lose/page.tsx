export default function Page() {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);

  return (
    <div className={'flex flex-col justify-center items-center py-8 px-4'}>
      <h1 className={'text-4xl font-bold'}>
        おめでとう！あなたは詐欺師に騙されました！
      </h1>
      <div className={'mt-6 flex flex-col text-center text-lg space-y-8'}>
        <span>
          私たちはあなたのメールアドレス、パスワードを持っているのでアカウントを乗っ取ることができます。
        </span>
        <span>
          返してほしければ、{date.getMonth()}月{date.getDay()}
          日までに50万円を送金してください。
        </span>
        <span></span>
        <span>...となってしまうかもしれませんね。</span>
        <span>
          私たち(Harukoto
          Project、Miranitos)は、このような詐欺に騙されないため、皆さんにインターネットに個人情報を簡単に書くのをやめてほしいと思っています。
        </span>
        <span>
          このような偽のサイトでクレジットカードの情報や、住所などを気軽に送信すると、アカウントの乗っ取りや、犯罪に巻き込まれることもあります。
        </span>
        <span>
          私たちはそのような体験を身をもってしてもらい、今後騙されることがないように注意していただきたいと思ってこのサイトを作成しました。
        </span>
        <span>
          このサイトで入力された個人情報(メールアドレス、パスワード、IPアドレス)は保存しておらず、利用規約に沿って運営されます。
        </span>
        <span>いくら身近な人でも、個人情報の扱いには気をつけてください。</span>
        <span className={'text-red-600 text-2xl underline'}>
          絶対に、信用できないサイトに個人情報を書き込むことはやめてください。
        </span>
        <span className={'text-red-600 text-2xl underline'}>
          URLや、利用規約、プライバシーポリシーをしっかりと読んで、信用できるサービスにのみ記入しましょう。
        </span>
        <span>よければ身近な人に拡散してみてね。</span>
      </div>
      <div className={'mt-8 text-center text-lg flex'}>
        <div className={'px-4'}>
          <a
            href={'https://www.harukoto.jp'}
            className={'text-blue-600 hover:underline'}
          >
            Harukoto Project
          </a>
        </div>
        <div className={'px-4'}>
          <a href={'/'} className={'text-blue-600 hover:underline'}>
            ホームに戻る
          </a>
        </div>
        <div className={'px-4'}>
          <a
            href={'https://www.miranitos.com'}
            className={'text-blue-600 hover:underline'}
          >
            Miranitos
          </a>
        </div>
        <div className={'px-4'}>
          <a
            href={'https://www.github.com/Harukotokoto/nsr-tools'}
            className={'text-blue-600 hover:underline'}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
