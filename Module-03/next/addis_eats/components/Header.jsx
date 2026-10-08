import LargeScreenNavbar from "./LargeScreenNavbar";

const Header = () => {

  return (
    <header className="px-2 md:px-8 lg:px-18 py-3 flex items-center justify-between max-w-375">
      {/* Logo */}
      <img src="/images/logo.webp" alt="Logo" className="w-24 md:w-28 lg:w-40" />

      <section className="flex items-center gap-4">
        {/* Cart Data */}
        {/* <HeaderCartInfo /> */}

        {/* Navbar for small screens */}
        {/* <SmallScreenNavbar/> */}

        {/* Navbar for large screens */}
        <LargeScreenNavbar />

        {/* Profile */}
        {/* {isAuthenticated && <UserProfile />} */}
      </section>
    </header>
  );
};

export default Header;