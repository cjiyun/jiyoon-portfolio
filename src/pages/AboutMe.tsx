import type { ReactElement } from 'react';
import { AiFillGithub, AiOutlineMail } from 'react-icons/ai';
import SectionHeader from '@/components/main/SectionHeader';
import { IconButton } from '@/components/common/IconButton';
import Vision from '@/components/aboutme/Vision';

const AboutMe = (): ReactElement => {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <SectionHeader title="About Me" />
      <div className="absolute top-[138px] flex h-[calc(100%-138px)] items-center justify-between gap-[10%] py-12 lg:top-[100px]">
        <div className="relative hidden h-full w-1/2 py-[30px] xl:flex">
          <div className="border-bluePrimary absolute h-[calc(100%-60px)] w-[calc(100%-40px)] rounded-md border-2"></div>
          <img
            src="/images/aboutme-profile.png"
            alt="profile-image"
            className="absolute top-[60px] left-[30px] h-[calc(100%-60px)] w-[calc(100%-40px)] justify-end rounded-md object-cover"
          />
        </div>
        <div className="bg-bg shadow-box h-fit min-h-full w-full space-y-5 rounded-lg p-10 xl:w-1/2 xl:space-y-5">
          <div className="flex items-center gap-5">
            <div className="h-24 w-24 overflow-hidden rounded-lg xl:hidden">
              <img
                src="/images/aboutme-profile.png"
                alt="profile-image"
                className="translate-x-5 translate-y-5 scale-170 transform"
              />
            </div>
            <div>
              <span className="bg-bluePrimary rounded-full px-2 text-xs font-light text-white">
                FRONTEND
              </span>
              <div className="flex gap-2.5">
                <h1 className="truncate text-2xl leading-none font-bold">최지윤</h1>
                <div className="flex items-end gap-1.5">
                  {[AiFillGithub, AiOutlineMail].map((Icon, idx) => (
                    <IconButton key={idx}>
                      <Icon size={20} />
                    </IconButton>
                  ))}
                </div>
              </div>
              <span className="text-bluePrimary text-xs">#도전 #끈기 #성장 #UI/UX</span>
            </div>
          </div>
          <Vision title="⌜ 사용자 중심 설계 ⌟">
            깔끔하고 직관적인 UI로 좋은 첫인상을 주고, 배려가 느껴지는 UX로 인상 깊은 경험을
            제공하는 개발자가 되고자 합니다. 저는 언제나 사용자의 입장에서 생각하며 개발에 임하고,
            작은 클릭 하나에도 의미와 배려를 담는 것을 목표로 합니다.
          </Vision>
          <Vision title="⌜ 도전, 끈기, 그리고 성장 ⌟">
            새로운 기술과 낯선 도구 앞에서도 두려움보다 호기심과 도전 정신을 선택해 왔습니다. 오류가
            반복되고 길이 보이지 않을 때도 있었지만, 매번 끝까지 해낸 후엔 그만큼 값진 성장이 남아
            있었습니다. 저는 그렇게 끈기와 실행력으로 문제를 해결해 왔습니다.
          </Vision>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
