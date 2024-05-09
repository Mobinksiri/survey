'use client';

import '@/app/_styles/globals.css';
import '@/app/_styles/font.css';
import Navigation from '../_components/navigation/Navigation';
import { Provider } from 'react-redux';
import { store } from '../store';
import Footer from '../_components/footer/Footer';
import { useParams, usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import LoginAndRegister from '../_components/common/loginAndRegister/LoginAndRegister';
import { QueryClient, QueryClientProvider } from 'react-query';
import GoToTop from '../_components/goToTop/GoToTop';
import { Suspense } from 'react';
import Loading from './loading';
import UserRevokeModal from '../_components/userRevokeModal/UserRevokeModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { singelQuiz, test } = useParams();

  const queryClient = new QueryClient();

  return (
    <>
      <html lang="fa" suppressHydrationWarning={true}>
        <head>
          <title>ایما</title>
        </head>
        <body
          className={`!overflow-x-hidden ${pathname?.includes('forum') ? 'pb-[90px] lg:pb-0' : ''}`}
          style={{
            backgroundColor: singelQuiz
              ? '#F3F4F6'
              : pathname?.includes('profile')
              ? '#F8F9FA'
              : 'white',
          }}
          dir="rtl"
          suppressHydrationWarning={true}
        >
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <Toaster
                position="bottom-left"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: '',
                  duration: 3000,
                  style: {
                    backgroundColor: '#333',
                    color: 'white',
                    fontSize: '13px',
                  },
                }}
              />
              <Navigation />
              <GoToTop />
              <LoginAndRegister />
              <UserRevokeModal />
              {/* <Suspense fallback={<Loading />}></Suspense> */}
              {children}
              {pathname !== '/' && !pathname.includes('profile') && !test && <Footer />}
            </QueryClientProvider>
          </Provider>
        </body>
      </html>
    </>
  );
}
