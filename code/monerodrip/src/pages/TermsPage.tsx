export function TermsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-text-secondary mb-8">Last updated: January 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-display text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-text-secondary">
              Dengan menggunakan MoneroDrip, Anda menyetujui syarat dan ketentuan ini. 
              Jika Anda tidak setuju dengan ketentuan apa pun, jangan gunakan layanan ini.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-text-secondary">
              MoneroDrip adalah platform non-custodial yang memfasilitasi Dollar Cost Averaging 
              otomatis dari berbagai token ERC-20 ke Monero (XMR). Kami menyediakan antarmuka 
              untuk berinteraksi dengan smart contracts di blockchain Ethereum.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">3. Eligibility</h2>
            <p className="text-text-secondary">
              Anda harus berusia minimal 18 tahun dan memiliki kapasitas hukum untuk menggunakan 
              layanan ini. Anda bertanggung jawab untuk memastikan bahwa penggunaan layanan ini 
              legal di yurisdiksi Anda.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">4. Risks</h2>
            <div className="p-4 bg-status-warning/10 border border-status-warning/30 rounded-lg mb-4">
              <p className="text-status-warning font-medium">Important Warning</p>
            </div>
            <p className="text-text-secondary mb-4">
              Cryptocurrency dan DeFi melibatkan risiko signifikan termasuk:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>- Volatilitas harga yang ekstrem</li>
              <li>- Risiko smart contract (bugs, exploits)</li>
              <li>- Risiko regulasi</li>
              <li>- Kehilangan akses ke wallet</li>
              <li>- Slippage dan biaya gas yang tidak terduga</li>
            </ul>
            <p className="text-text-secondary mt-4">
              Anda mengakui bahwa Anda memahami risiko ini dan bertanggung jawab penuh atas 
              keputusan investasi Anda.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">5. Non-Custodial Nature</h2>
            <p className="text-text-secondary">
              MoneroDrip adalah layanan non-custodial. Kami tidak pernah memiliki custody atau 
              kontrol atas aset Anda. Token Anda tetap di wallet Anda sampai saat eksekusi swap. 
              Kami tidak dapat memulihkan token yang hilang atau dicuri.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">6. Fees</h2>
            <p className="text-text-secondary">
              Platform fee sebesar 0.3% dikenakan per swap yang berhasil. Gas fee untuk transaksi 
              Ethereum dibayar oleh pengguna. Fee dapat berubah dengan pemberitahuan 30 hari 
              sebelumnya.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-text-secondary">
              MONERODRIP DISEDIAKAN "AS IS" TANPA JAMINAN APA PUN. KAMI TIDAK BERTANGGUNG JAWAB 
              ATAS KERUGIAN LANGSUNG, TIDAK LANGSUNG, INSIDENTAL, KHUSUS, ATAU KONSEKUENSIAL 
              YANG TIMBUL DARI PENGGUNAAN LAYANAN INI.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">8. Modifications</h2>
            <p className="text-text-secondary">
              Kami dapat memodifikasi ketentuan ini kapan saja. Perubahan akan efektif segera 
              setelah diposting. Penggunaan berkelanjutan layanan merupakan penerimaan 
              ketentuan yang dimodifikasi.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold mb-4">9. Governing Law</h2>
            <p className="text-text-secondary">
              Ketentuan ini diatur oleh hukum yang berlaku di yurisdiksi tempat Anda berada, 
              sejauh tidak bertentangan dengan sifat terdesentralisasi dari layanan ini.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
