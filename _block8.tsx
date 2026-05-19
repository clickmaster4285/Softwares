function Hero({ page }: { page: ServicePageData }) {
  const featureSection = page.sections.find((s) => s.title === 'Features');
  const bullets = page.topBullets.length
    ? page.topBullets
    : featureSection?.bullets ?? [];

  return (
    // ...
    <Label>{page.subtitle}</Label>
    <h1>{page.title}</h1>
    <p>{featureSection?.body ?? page.sections[0]?.body}</p>
    {bullets.map((item) => (/* checklist row */))}
  );
}