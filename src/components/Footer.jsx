function Footer() {
  return (
    <footer className="bg-rose-100 text-purple-800 text-center py-4 mt-10 shadow-inner">
      <p className="text-sm tracking-wide font-medium">
        &copy; {new Date().getFullYear()} GenZ Store
      </p>
    </footer>
  );
}

export default Footer;
