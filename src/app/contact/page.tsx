export default function ContactPage() {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-400 mb-6">
            Contact Us
          </h1>
  
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <p className="text-gray-300 mb-6">
              Jika memiliki pertanyaan, saran, atau mengalami kendala saat
              menggunakan website, silakan hubungi kami melalui informasi
              berikut:
            </p>
  
            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-blue-400">Email</h2>
                <p>support@switchind.com</p>
              </div>
  
              <div>
                <h2 className="font-semibold text-blue-400">Phone</h2>
                <p>+62 858-4226-2366</p>
              </div>
  
              <div>
                <h2 className="font-semibold text-blue-400">Address</h2>
                <p>
                  Jakarta, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }