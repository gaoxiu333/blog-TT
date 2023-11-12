import '@/styles/globals.css'
import '@/styles/prism.css'
import { Providers } from '@/components/theme/provide'
import Header from '@/components/Header/Header'
import StyledComponentsRegistry from '@/components/styled-components/registry';
import Script from 'next/script';


export const metadata = {
  title: 'olOwOlo',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // html suppressHydrationWarning 避免React报错
  return (
    <html suppressHydrationWarning>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <body className='antialiased text-balck min-h-screen dark:text-white bg-white dark:bg-black'>
        {/* 注入 styled component */}
        <StyledComponentsRegistry>
          {/* 注入主题  next-themes */}
          <Providers>
            {children}
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
