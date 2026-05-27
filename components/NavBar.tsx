import Link from 'next/link'
import SearchForm from './SearchForm'

export default function Navbar() {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <nav className="
        sticky
        top-0
        z-50
        bg-white
        border-b
        max-w-6xl
        mx-auto
        px-4
        py-3
        flex
        items-center
        justify-between
      ">
        {/* LEFT SIDE */}

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="
              text-xl
              font-bold
              hover:text-blue-600
              transition
            "
          >
            BRAG Route Guide
          </Link>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-4">
            <SearchForm />

            <Link
                href="/"
                className="
                px-3
                py-2
                rounded-lg
                hover:bg-gray-100
                transition
                "
            >
                Home
            </Link>
        </div>
      </nav>
    </header>
  )
}