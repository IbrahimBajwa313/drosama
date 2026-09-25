import RevealText from './RevealText'

/** Eyebrow label + editorial serif title. */
export default function SectionHeading({ index, eyebrow, title, as = 'h2', id, className = '', titleClass = '', children }) {
  return (
    <header className={`sh ${className}`}>
      <p className="eyebrow">
        {index && <span className="eyebrow-index">{index}</span>}
        <span>{eyebrow}</span>
      </p>
      <RevealText as={as} id={id} lines={title} className={`display ${titleClass}`} />
      {children}
    </header>
  )
}
