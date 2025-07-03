import type { ReactElement } from 'react';
import SectionHeader from '@/components/main/SectionHeader';
import { buttons } from '@/constants/buttons';
import { LinkButton } from '@/components/common/LinkButton';

const Contact = (): ReactElement => {
  return (
    <div className="relative flex h-screen w-full flex-col gap-10">
      <SectionHeader title="Contact" />
      <div className="bg-bg box-shadow absolute top-[138px] my-6 flex h-2/3 w-full flex-col items-center gap-10 rounded-lg p-20 lg:top-[100px]">
        <h2 className="text-bluePrimary text-2xl font-bold">봐주셔서 감사합니다!</h2>
        <p className="text-center text-xl break-keep">
          저와 함께하고 싶으시거나 궁금한 점이 있으시다면 언제든 연락 주세요 :)
        </p>
        <div className="flex h-full flex-col justify-evenly">
          {buttons.map(({ Icon, label, href }, idx) => (
            <div key={idx} className="h-16 w-72">
              <LinkButton href={href} className="gap-5 px-5 py-2">
                <Icon size={40} />
                <p>{label}</p>
              </LinkButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
