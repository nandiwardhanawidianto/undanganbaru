import logoshopee from "../assets/logoshopee.png";

export default function Footer() {
  return (
    <footer className="py-8 pb-20 bg-biru-600 text-center text-white text-lg">
      <p className="mt-4">&copy; 2023 Royal Wedding Invitation Planner</p>

      {/* Logo + tulisan dengan link */}
      <div className="flex items-center justify-center mt-6">
        <a
          href="https://id.shp.ee/FBUfvqQp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src={logoshopee}
            alt="Shopee Logo"
            className="w-6 h-6 object-contain"
          />
          <span className="text-lg font-medium">RoyalWeddingInvitation</span>
        </a>
      </div>
    </footer>
  );
}
