export default function AboutPage() {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-400 mb-6">
            About SwitchInd
          </h1>
  
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <p className="mb-4 text-gray-300 leading-relaxed">
              SwitchInd merupakan aplikasi e-commerce berbasis web yang
              menyediakan berbagai jenis mechanical keyboard switch untuk
              memenuhi kebutuhan pengguna, baik untuk gaming, pekerjaan,
              maupun aktivitas mengetik sehari-hari.
            </p>
  
            <p className="mb-4 text-gray-300 leading-relaxed">
              Selain berfungsi sebagai media transaksi online, SwitchInd juga
              menyediakan informasi mengenai karakteristik switch seperti
              Linear, Tactile, dan Clicky sehingga pengguna dapat memilih
              switch yang sesuai dengan preferensi masing-masing.
            </p>
  
            <p className="text-gray-300 leading-relaxed">
              Website ini dikembangkan menggunakan teknologi Next.js,
              Prisma ORM, PostgreSQL, Midtrans Payment Gateway, Google OAuth,
              serta dihosting menggunakan platform Vercel.
            </p>
          </div>
  
          <div className="mt-8 bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Our Mission
            </h2>
  
            <p className="text-gray-300 leading-relaxed">
              Memberikan kemudahan bagi pengguna dalam menemukan, memahami,
              dan membeli mechanical keyboard switch yang sesuai dengan
              kebutuhan mereka melalui platform yang informatif dan mudah
              digunakan.
            </p>
          </div>
        </div>
      </main>
    );
  }