export function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-text-secondary mb-8">Last updated: January 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Our Commitment</h2>
            <p className="text-text-secondary">
              MoneroDrip dibangun dengan prinsip privasi mutlak. Kami percaya bahwa privasi finansial 
              adalah hak fundamental, bukan privilese. Kebijakan ini menjelaskan bagaimana kami 
              menghormati dan melindungi privasi Anda.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Data yang Kami TIDAK Kumpulkan</h2>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>Tidak ada cookies pelacakan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>Tidak ada analytics (Google Analytics, Mixpanel, dll)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>Tidak ada tracking pixels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>Tidak ada fingerprinting browser</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>Tidak ada penyimpanan IP address</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-status-success">-</span>
                <span>Tidak ada akun pengguna atau email</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Data Minimal yang Diproses</h2>
            <p className="text-text-secondary mb-4">
              Untuk menjalankan layanan DCA, kami memproses data berikut secara temporer:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-primary">1.</span>
                <span><strong>Alamat Wallet Ethereum:</strong> Diperlukan untuk mengeksekusi transaksi. Tidak dikaitkan dengan identitas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                <span><strong>Alamat XMR Tujuan:</strong> Di-hash dan disimpan sementara untuk routing pembayaran.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                <span><strong>Parameter Strategi:</strong> Jumlah, interval, dan jumlah order yang diinginkan.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Penghapusan Otomatis</h2>
            <p className="text-text-secondary">
              Semua data strategi DCA dihapus secara otomatis dalam 30 hari setelah strategi selesai 
              atau dibatalkan. Anda juga dapat meminta penghapusan segera melalui Dashboard.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">On-Chain Data</h2>
            <p className="text-text-secondary">
              Transaksi di blockchain Ethereum bersifat publik dan permanen. Namun, begitu swap 
              dikonversi ke Monero, transaksi menjadi sepenuhnya tidak dapat dilacak berkat 
              teknologi privasi bawaan Monero.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Third Parties</h2>
            <p className="text-text-secondary">
              Kami tidak membagikan data apa pun dengan pihak ketiga. Tidak ada mitra iklan, 
              tidak ada data broker, tidak ada penjualan data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">Contact</h2>
            <p className="text-text-secondary">
              Pertanyaan tentang privasi? Hubungi kami via encrypted channels yang tercantum 
              di halaman dokumentasi.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
