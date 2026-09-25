import { doctor, contact, footer } from '../data/content'

export default function Footer() {
  return (
    <footer className="footer" data-nav="dark">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-name">{doctor.name}</p>
            <p className="footer-spec">{doctor.specialty}</p>
          </div>

          <div className="footer-col">
            <h2 className="footer-h">Contact</h2>
            <a href={contact.phoneHref} className="ulink">
              {contact.phoneDisplay}
            </a>
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="ulink">
                {contact.email}
              </a>
            )}
            <span>{contact.languages}</span>
          </div>

          <div className="footer-col">
            <h2 className="footer-h">Location</h2>
            <address>
              {contact.addressLines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          </div>

          <nav className="footer-col" aria-label="Footer">
            <h2 className="footer-h">Navigation</h2>
            {footer.links.map((l) => (
              <a key={l.label} href={l.href} className="ulink">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="footer-col">
            <h2 className="footer-h">Online</h2>
            {contact.social.map((s) => (
              <a key={s.label} href={s.href} className="ulink" target="_blank" rel="noopener noreferrer">
                {s.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>

        <p id="disclaimer" className="footer-disclaimer">
          <strong>Medical disclaimer.</strong> {footer.disclaimer}
        </p>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {doctor.name}. All rights reserved.
          </p>
          <ul className="footer-legal">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="ulink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#top" className="footer-top-link ulink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
