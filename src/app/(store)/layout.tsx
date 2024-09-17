import Header from '@/components/header';

async function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid-rows-app mx-auto grid min-h-screen w-full max-w-[1600px] gap-5 p-8'>
      <Header />
      {children}
    </div>
  );
}

export default StoreLayout;
