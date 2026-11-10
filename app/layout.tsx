import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Fast Traders | Renovation & Interiors in Lahore', description: 'Home and office renovation, furniture, woodwork, flooring and technical services in Lahore. Fast Traders — Count on Us.' };
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
