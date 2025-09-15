export default function Navbar() {
    return (
      <nav className="fixed bottom-0 w-full bg-gold text-black">
        <ul className="flex justify-around">
          <li><a href="#home" className="block py-2">Home</a></li>
          <li><a href="#mempelai" className="block py-2">Mempelai</a></li>
          <li><a href="#tanggal" className="block py-2">Tanggal</a></li>
          <li><a href="#galeri" className="block py-2">Galeri</a></li>
          <li><a href="#ucapan" className="block py-2">Ucapan</a></li>
        </ul>
      </nav>
    );
  }
  