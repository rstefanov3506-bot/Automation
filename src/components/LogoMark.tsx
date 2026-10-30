// Path N symbol (brand/logo): the N drawn as one automation path with a
// trigger node, an agent node and a filled result node. Inline SVG driven by
// theme tokens, so one component serves light and dark: the line follows
// currentColor, the result node uses the accent, and the hollow nodes are
// filled with the page background. Geometry matches brand/logo/generate.mjs.
export default function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 19V5L18 19V5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="19" r="2.9" fill="var(--background)" stroke="currentColor" strokeWidth={2} />
      <circle cx="12" cy="12" r="2.9" fill="var(--background)" stroke="currentColor" strokeWidth={2} />
      <circle cx="18" cy="5" r="3.2" fill="var(--accent)" />
    </svg>
  );
}
