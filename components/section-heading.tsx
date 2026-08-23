type SectionHeadingProps = {
  /** Two-digit section number shown in mono, e.g. "01". */
  num: string;
  label: string;
  title: string;
};

export function SectionHeading({ num, label, title }: SectionHeadingProps) {
  return (
    <div className="sec-head">
      <div className="sec-kicker">
        <span className="sec-num">{num}</span>
        <span className="sec-rule" aria-hidden="true" />
        <span className="sec-label">{label}</span>
      </div>
      <h2 className="sec-title">{title}</h2>
    </div>
  );
}
