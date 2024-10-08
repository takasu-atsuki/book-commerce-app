// 'use client';

// サーバーサイドに書き換える

import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

type SearchParamsProps = {
  session_id: string;
};

function PurchaseSuccess({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  // const searchParams = useSearchParams();
  // const sessionId = searchParams.get('session_id');
  // const [bookUrl, setBookUrl] = useState<string>('');
  const sessionId = searchParams.session_id;
  let bookUrl = '';

  (async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/success`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        }
      );
      const data = await res.json();
      bookUrl = data.purchase.bookId;
    } catch (err) {
      console.log(err);
    }
  })();

  return (
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          購入ありがとうございます
        </h1>
        <p className="text-center text-gray-600">
          ご購入頂いた内容の詳細は、登録されたメールアドレスに送信されます。
        </p>
        <div className="mt-6 text-center">
          <Link
            href={`/book/${bookUrl}`}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            購入した記事を読む
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PurchaseSuccess;
