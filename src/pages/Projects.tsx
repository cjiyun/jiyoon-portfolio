import { useState, type ReactElement } from 'react';
import SectionHeader from '@/components/main/SectionHeader';
import CardStackLayout from '@/components/projects/CardStackLayout';
import type { ProjectT } from '@/types/type';
import CardGridLayout from '@/components/projects/CardGridLayout';

const FILTERS = ['All', 'Team', 'Single'] as const;
type Filter = (typeof FILTERS)[number];

const projects: ProjectT[] = [
  {
    id: 1,
    title: 'EasyPlace - 쉽게 갈 수 있는 장소',
    description:
      '교통약자가 안심하고 방문할 수 있도록, 핫플레이스의 교통약자 편의시설 정보를 제공하는 서비스',
    category: ['팀', 'FE'],
    image: '/images/easyplace_mock.png',
  },
  {
    id: 2,
    title: '포트폴리오 사이트',
    description: '프론트엔드 개발자 최지윤을 소개하는 나만의 포트폴리오 사이트',
    category: ['개인', 'FE', '디자인', '기획'],
    image: '/images/portfolio_mock.png',
    github: 'https://github.com/cjiyun/jiyoon-portfolio',
  },
];

const MODES = [
  { mode: 'carousel' as const, label: '모아보기' },
  { mode: 'grid' as const, label: '펼쳐보기' },
];

const Projects = (): ReactElement => {
  const [filters, setFilters] = useState<Filter>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('carousel');

  // 카테고리별 필터링
  const filtered = projects.filter(p => {
    if (filters === 'All') return true;
    if (filters === 'Team') return p.category.includes('팀');
    if (filters === 'Single') return p.category.includes('개인');
    return true;
  });

  return (
    <div className="relative flex h-screen w-full">
      <SectionHeader title="Projects" />
      <div className="absolute top-[138px] my-6 flex h-[calc(100%-200px)] w-full flex-col gap-10 lg:top-[100px] lg:my-10 lg:h-[calc(100%-180px)] lg:gap-12">
        <div className="space-y-2.5 space-x-2.5">
          {MODES.map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`cursor-pointer rounded-full border px-4 py-1 text-lg font-medium ${
                viewMode === mode
                  ? 'bg-bluePrimary border-bluePrimary text-white'
                  : 'hover:border-bluePrimary hover:text-bluePrimary border-gray-300 text-gray-600'
              } `}
            >
              {label}
            </button>
          ))}
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setFilters(filter)}
              className={`cursor-pointer rounded-full border px-4 py-1 text-lg font-medium ${
                filters === filter
                  ? 'bg-bluePrimary text-white'
                  : 'hover:border-bluePrimary hover:text-bluePrimary border-gray-300 text-gray-600'
              } `}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* ——— 모아보기 (Carousel) ——— */}
        {viewMode === 'carousel' && <CardStackLayout filtered={filtered} />}

        {/* — 펼쳐보기: 그리드 레이아웃 — */}
        {viewMode === 'grid' && (
          <div className="overflow-x-hidden overflow-y-auto sm:overflow-visible">
            <CardGridLayout filtered={filtered} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
