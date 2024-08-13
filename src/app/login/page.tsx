import { getProviders, signIn } from 'next-auth/react';
import ProviderOnClickButton from '../components/ProviderOnClickButton';

const Login = async () => {
  const providers = await getProviders();

  return (
    <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントにログイン
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <h1>プロバーダーズはこちら</h1>
          {providers &&
            Object.values(providers).map((provider: any) => {
              return (
                <div className="text-center" key={provider.id}>
                  <h2>あるはず。。。。</h2>
                  <ProviderOnClickButton provider={provider} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Login;
