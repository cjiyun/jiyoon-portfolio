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
    name: 'EasyPlace',
    title: 'EasyPlace - 쉽게 갈 수 있는 장소',
    description:
      '교통약자가 안심하고 방문할 수 있도록, 핫플레이스의 교통약자 편의시설 정보를 제공하는 서비스',
    category: ['팀', 'FE'],
    image: '/images/easyplace_mock.png',
    github: 'https://github.com/G10wth/G10wth_FE',
  },
  {
    id: 2,
    name: 'jiyoon-portfolio',
    title: '포트폴리오 사이트',
    description: '프론트엔드 개발자 최지윤을 소개하는 나만의 포트폴리오 사이트',
    category: ['개인', 'FE', '디자인', '기획'],
    image: '/images/portfolio_mock.png',
    github: 'https://github.com/cjiyun/jiyoon-portfolio',
  },
];

const MODES = [
  { mode: 'stack' as const, label: '모아보기' },
  { mode: 'grid' as const, label: '펼쳐보기' },
];

const Projects = (): ReactElement => {
  const [filters, setFilters] = useState<Filter>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'stack'>('stack');

  // 카테고리별 필터링
  const filtered = projects.filter(p => {
    if (filters === 'All') return true;
    if (filters === 'Team') return p.category.includes('팀');
    if (filters === 'Single') return p.category.includes('개인');
    return true;
  });

  return (
    <div className="flex w-full flex-col">
      <SectionHeader title="Projects" />
      <div className="bg-bg shadow-box my-12 flex h-fit min-h-[75vh] w-full flex-col rounded-lg p-5">
        <div className="flex flex-wrap gap-2.5 text-sm">
          {MODES.map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`cursor-pointer rounded-full border px-4 py-1 font-medium transition-colors duration-300 ${
                viewMode === mode
                  ? 'bg-bluePrimary border-bluePrimary text-white'
                  : 'hover:border-bluePrimary hover:text-bluePrimary border-gray-500 text-gray-600'
              } `}
            >
              {label}
            </button>
          ))}
          <div className="inline-flex gap-2.5 whitespace-nowrap">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setFilters(filter)}
                className={`cursor-pointer rounded-full border px-4 py-1 font-medium transition-colors duration-300 ${
                  filters === filter
                    ? 'bg-bluePrimary border-bluePrimary text-white'
                    : 'hover:border-bluePrimary hover:text-bluePrimary border-gray-500 text-gray-600'
                } `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'stack' && <CardStackLayout filtered={filtered} />}

        {viewMode === 'grid' && <CardGridLayout filtered={filtered} />}
      </div>
    </div>
  );
};

export default Projects;
