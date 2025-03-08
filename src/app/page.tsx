'use client';
import { useEffect } from 'react';
import { Form } from '@/components/ui/Form';
import { sendWarnMessage } from '@/functions/sendWarnMessage';

export default function Home() {
  useEffect(() => {
    sendWarnMessage();
    setInterval(sendWarnMessage, 1500);
  }, []);

  return (
    <div className={'min-h-screen flex items-center justify-center'}>
      <div className={'flex justify-center items-center w-full'}>
        <div className={'flex flex-col w-full max-w-md space-y-8 mx-4'}>
          <h1
            className={
              'text-2xl lg:text-3xl font-bold text-center text-gray-800 dark:text-white'
            }
          >
            NSR Toolsにログイン
          </h1>
          <Form />
        </div>
      </div>
    </div>
  );
}
