import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
        <h1>Addis Eats</h1>

        <nav className="flex items-center gap-4">
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/cart"}>Cart</Link>
            <Link href={"/checkout"}>Checkout</Link>
        </nav>
    </header>
  )
}

export default Header