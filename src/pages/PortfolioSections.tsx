import { PORTFOLIO_SECTIONS } from './sections';

export const PortfolioSections = () => {
  return (
    <main>
      {PORTFOLIO_SECTIONS.map(({ id, index, Component }) => (
        <section key={id} id={id} data-index={index} className="scroll-section">
          <Component />
        </section>
      ))}
    </main>
  );
};
