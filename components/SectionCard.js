export default function SectionCard({ title, children, accent = false, eyebrow = '' }) {
  return (
    <section className={`card ${accent ? 'accent' : ''}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  );
}
