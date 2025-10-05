import "../style.css";
import Link from "next/link";

export const metadata = {
  title: "Professional Portfolio",
  description: "A professional portfolio showcasing modern web development skills",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </head>
      <body>
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <h2>Portfolio</h2>
            </div>
            <ul className="nav-menu">
              <li><a href="#home" className="nav-link">Home</a></li>
              <li><a href="#about" className="nav-link">About</a></li>
              <li><a href="#skills" className="nav-link">Skills</a></li>
              <li><a href="#projects" className="nav-link">Projects</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
              <li><Link href="/login" className="nav-link login-btn">Login</Link></li>
            </ul>
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 Your Name. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

