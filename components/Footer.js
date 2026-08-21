import Link from 'next/link';

const socialLabels = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
};

export default function Footer({ settings }) {
  const social = settings?.socialLinks || {};

  return (
    <footer className="bg-steel text-paper mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold mb-3">
            NIK <span className="text-amber">EXPORTS</span>
          </p>
          <p className="text-sm text-paper/70 leading-relaxed max-w-xs">
            {settings?.aboutText}
          </p>
        </div>

        <div>
          <p className="mono-label text-xs uppercase text-amber mb-3">Reach Us</p>
          <ul className="text-sm text-paper/80 space-y-2">
            {settings?.contactEmail && <li>{settings.contactEmail}</li>}
            {settings?.contactPhone && <li>{settings.contactPhone}</li>}
            {settings?.address && <li>{settings.address}</li>}
          </ul>
        </div>

        <div>
          <p className="mono-label text-xs uppercase text-amber mb-3">Follow</p>
          <ul className="text-sm text-paper/80 space-y-2">
            {Object.entries(social)
              .filter(([, url]) => url)
              .map(([key, url]) => (
                <li key={key}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-amber">
                    {socialLabels[key] || key}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-5 text-center text-xs text-paper/50 mono-label">
        © {new Date().getFullYear()} NIK EXPORTS — ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}
