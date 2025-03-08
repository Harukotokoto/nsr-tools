'use client';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export function Form() {
  const [csrfToken, setCsrfToken] = useState('');

  const fetchCsrfToken = async () => {
    const res = await fetch('/api/csrf', { credentials: 'include' });
    const data = await res.json();
    setCsrfToken(data.csrfToken || '');
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const [slackId, setSlackId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState<null | string>(null);

  const isNSREmail = (email: string) => {
    const emailRegex = /[a-z]+_((22|23|24|25)([sn])|25r)\d{7}(@nnn.ed.jp)/gi;
    return emailRegex.test(email);
  };

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    if (slackId.length === 0) {
      setError('SlackIDを入力してください');
      setLoading(false);
      return;
    }

    if (email.length === 0) {
      setError('メールアドレスを入力してください');
      setLoading(false);
      return;
    }

    // taro_25n1234567@nnn.ed.jp
    if (!isNSREmail(email)) {
      setError('学校側から発行されたメールアドレスを使用してください');
      setLoading(false);
      return;
    }

    if (password.length === 0) {
      setError('パスワードを入力してください');
      setLoading(false);
      return;
    }

    if (!isTermsChecked) {
      setError('利用規約に同意してください');
      setLoading(false);
      return;
    }

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken || '',
      },
      body: JSON.stringify({ slackId }),
    });

    if (response.status == 200) {
      redirect('/you-lose');
    } else {
      setError('フォームの送信に失敗しました');
      setLoading(false);
    }

    return;
  };

  return (
    <>
      <div className={'flex flex-col space-y-4'}>
        {error && (
          <div
            className={
              'w-full border border-red-400 bg-red-200 p-4 flex justify-center items-center text-center rounded-md'
            }
          >
            <span className={'text-red-500'}>{error}</span>
          </div>
        )}
        <div className={'flex flex-col space-y-2'}>
          <label
            htmlFor={'slack_id'}
            className={
              'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            }
          >
            Slack ID <span className={'text-red-600'}>*</span>
          </label>
          <div className={'flex w-full'}>
            <input
              type={'text'}
              id={'slack_id'}
              className={
                'rounded-lg bg-gray-50 border text-gray-90 focus:border-indigo-600 focus:outline-0 block flex-1 min-w-0 text-sm border-gray-300 p-2.5 dark:placeholder:text-gray-600'
              }
              placeholder={'John Doe'}
              onChange={(e) => setSlackId(e.target.value)}
              value={slackId}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={'flex flex-col space-y-2'}>
          <label
            htmlFor={'email'}
            className={
              'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            }
          >
            メールアドレス <span className={'text-red-600'}>*</span>
          </label>
          <div className={'flex w-full'}>
            <input
              type={'email'}
              id={'email'}
              className={
                'rounded-lg bg-gray-50 border text-gray-90 focus:border-indigo-600 focus:outline-0 block flex-1 min-w-0 text-sm border-gray-300 p-2.5 dark:placeholder:text-gray-600'
              }
              placeholder={'taro_25n1234567@nnn.ed.jp'}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className={'flex flex-col space-y-2'}>
          <label
            htmlFor={'password'}
            className={
              'block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            }
          >
            パスワード <span className={'text-red-600'}>*</span>
          </label>
          <div className={'flex w-full'}>
            <input
              type={'password'}
              id={'password'}
              className={
                'rounded-lg bg-gray-50 border text-gray-90 focus:border-indigo-600 focus:outline-0 block flex-1 min-w-0 text-sm border-gray-300 p-2.5 dark:placeholder:text-gray-600'
              }
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      <div className={'flex flex-col space-y-2'}>
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
            onChange={() => setIsTermsChecked(!isTermsChecked)}
            checked={isTermsChecked}
            disabled={isLoading}
          />
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <a
              href="/terms"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              利用規約
            </a>
            に同意します
          </label>
        </div>
      </div>
      <input
        type={'submit'}
        className={
          'w-full bg-indigo-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-indigo-800'
        }
        onClick={onSubmit}
        value={'ログイン'}
        disabled={isLoading}
      />
    </>
  );
}
