import InquiryForm from '@/components/InquiryForm';
import { getSiteSettings } from '@/lib/data';

export const metadata = { title: 'Contact — Nik Exports' };

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <section className="mx-auto max-w-7xl px-5 md:px-8 py-14">
      <p className="mono-label text-xs uppercase text-amber-dark mb-2">Get In Touch</p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-10 border-b border-line pb-6">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-graphite leading-relaxed mb-6 max-w-md">
            Have a requirement for trucks, buses, equipment, or agricultural machinery?
            Send us the details and we&apos;ll respond with availability and pricing.
          </p>
          <ul className="mono-label text-sm space-y-3">
            {settings?.contactEmail && (
              <li>
                <span className="text-graphite uppercase text-[11px] block">Email</span>
                {settings.contactEmail}
              </li>
            )}
            {settings?.contactPhone && (
              <li>
                <span className="text-graphite uppercase text-[11px] block">Phone / WhatsApp</span>
                {settings.contactPhone}
              </li>
            )}
            {settings?.address && (
              <li>
                <span className="text-graphite uppercase text-[11px] block">Address</span>
                {settings.address}
              </li>
            )}
          </ul>
        </div>

        <InquiryForm productName="" />
      </div>
    </section>
  );
}
