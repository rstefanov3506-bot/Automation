import { privacy, type LegalDoc } from "@/lib/privacy";
import type { Locale } from "@/lib/content";

// Generic renderer for legal pages (privacy, terms, cookies): plain data in,
// headings / paragraphs / lists / tables out.
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{doc.title}</h1>
      <p className="mt-2 text-sm text-muted">{doc.updated}</p>
      <div className="mt-10 space-y-8 text-[15px] leading-relaxed">
        {doc.sections.map((s, i) => (
          <section key={i}>
            {s.h && <h2 className="text-lg font-semibold">{s.h}</h2>}
            {s.p?.map((p, j) => (
              <p key={j} className="mt-3 text-muted">{p}</p>
            ))}
            {s.ul && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted">
                {s.ul.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            )}
            {s.table && (
              <div className="mt-4 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead className="bg-surface">
                    <tr>
                      {s.table.head.map((h) => (
                        <th key={h} className="px-3 py-2 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r, j) => (
                      <tr key={j} className="border-t border-border align-top">
                        {r.map((c, k) => (
                          <td key={k} className={`px-3 py-2 ${k === 0 ? "font-mono text-xs" : "text-muted"}`}>{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {s.after?.map((p, j) => (
              <p key={j} className="mt-3 text-muted">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}

export default function PrivacyPolicy({ locale }: { locale: Locale }) {
  return <LegalPage doc={privacy[locale]} />;
}
