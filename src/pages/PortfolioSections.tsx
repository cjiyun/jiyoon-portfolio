import { PORTFOLIO_SECTIONS } from './sections';

export const PortfolioSections = () => {
  return (
    <div>
      {PORTFOLIO_SECTIONS.map(({ id, index, Component }) => (
        <section
          key={id}
          id={id}
          data-index={index}
          aria-labelledby={`${id}-title`}
          className="scroll-section"
        >
          <Component />
        </section>
      ))}
    </div>
  );
};
