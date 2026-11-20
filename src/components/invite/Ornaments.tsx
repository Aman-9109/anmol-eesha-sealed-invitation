export function LotusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M12 21v-6" />
      <path d="M12 15c-2.6 0-4-1.7-4-3.6 0-1.9 1.8-3.4 4-3.4s4 1.5 4 3.4c0 1.9-1.4 3.6-4 3.6Z" />
      <path d="M12 8c-1.2-1.3-1.2-3.4 0-5 1.2 1.6 1.2 3.7 0 5Z" />
      <path d="M8.2 10.3C6.4 9.9 5 8.4 5 6.6c1.9 0 3.4 1.2 3.9 2.9" />
      <path d="M15.8 10.3c1.8-.4 3.2-1.9 3.2-3.7-1.9 0-3.4 1.2-3.9 2.9" />
      <path d="M9 18.5c1-.6 2-.9 3-.9s2 .3 3 .9" />
    </svg>
  );
}

export function BotanicalRule() {
  return (
    <div className="botanical-rule" aria-hidden="true">
      <i />
      <LotusIcon />
      <i />
    </div>
  );
}

export function Monogram({ className = "" }: { className?: string }) {
  return (
    <span className={`monogram ${className}`} aria-label="A and E">
      A<i>&amp;</i>E
    </span>
  );
}

export function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2 id={id}>{title}</h2>
      <BotanicalRule />
    </div>
  );
}
