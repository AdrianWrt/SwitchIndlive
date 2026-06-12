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
                <p>+62 812-3456-7890</p>
              </div>
  
              <div>
                <h2 className="font-semibold text-blue-400">Address</h2>
                <p>
                  Jakarta, Indonesia
                </p>
              </div>
            </div>
          </div>
  
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg mt-8">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              Send a Message
            </h2>
  
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded bg-gray-900 border border-gray-700"
              />
  
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded bg-gray-900 border border-gray-700"
              />
  
              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full p-3 rounded bg-gray-900 border border-gray-700"
              />
  
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }