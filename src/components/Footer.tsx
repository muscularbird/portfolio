export default function Footer() {
  return (
        <footer className="w-full text-text py-6 mt-20">
            <div className="container mx-auto text-center space-y-4">
                <p>&copy; {new Date().getFullYear()} Etienne KRETZ. All rights reserved.</p>
                <a href="/contact">Contact Me</a>
            </div>
        </footer>
  )
}
