export default function Ucapan() {
  return (
    <section id="ucapan" className="py-16 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-4">Ucapan & Doa</h2>
      <form className="max-w-xl mx-auto space-y-4">
        <input type="text" placeholder="Nama" className="w-full p-2 rounded bg-gray-800"/>
        <textarea placeholder="Pesan" className="w-full p-2 rounded bg-gray-800"></textarea>
        <div className="flex space-x-4">
          <label><input type="radio" name="konfirmasi" /> Hadir</label>
          <label><input type="radio" name="konfirmasi" /> Tidak</label>
        </div>
        <button type="submit" className="px-4 py-2 bg-gold text-black rounded">Kirim</button>
      </form>
    </section>
  );
}
