// Nav, Footer, ScrollToTop, RevealInit are all handled globally in app/layout.tsx
// PageLayout just adds the correct top padding offset for the fixed nav
export default function PageLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ paddingTop: "80px" }}>{children}</div>;
}
