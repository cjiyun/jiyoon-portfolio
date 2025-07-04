import type { ReactElement } from 'react';
import SectionHeader from '@/components/main/SectionHeader';
import { buttons } from '@/constants/buttons';
import { LinkButton } from '@/components/common/LinkButton';

const Contact = (): ReactElement => {
  return (
    <div className="flex w-full flex-col pb-10">
      <SectionHeader title="Contact" />
      <div className="bg-bg box-shadow my-12 flex h-[70vh] w-full flex-col items-center gap-6 rounded-lg p-15">
        <h2 className="text-bluePrimary text-xl font-bold">봐주셔서 감사합니다!</h2>
        <p className="text-center break-keep">
          저와 함께하고 싶으시거나 궁금한 점이 있으시다면 언제든 연락 주세요 :)
        </p>
        <div className="flex h-full w-fit flex-col justify-evenly">
          {buttons.map(({ Icon, label, href }, idx) => (
            <div key={idx} className="w-full">
              <LinkButton href={href} className="gap-5 px-5 py-2 text-sm">
                <Icon size={36} />
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
