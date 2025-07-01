import type { ReactElement, ReactNode } from 'react';

interface VisionProps {
  title: string;
  children: ReactNode;
}

const Vision = ({ title, children }: VisionProps): ReactElement => (
  <div className="space-y-3">
    <h2 className="bg-bluePrimary truncate rounded-md px-4 py-1.5 text-lg font-bold text-white">
      {title}
    </h2>
    <p className="leading-relaxed">{children}</p>
  </div>
);

export default Vision;
