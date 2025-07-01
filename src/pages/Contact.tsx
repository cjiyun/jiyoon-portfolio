import type { ReactElement } from 'react';
import SectionHeader from '@/components/main/SectionHeader';
import { AiFillGithub, AiOutlineMail, AiOutlineSend } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { buttonVariants } from '@/animations/variants';

const buttons = [
  {
    icon: <AiFillGithub size={40} />,
    label: 'cjiyun',
  },
  {
    icon: <AiOutlineMail size={40} />,
    label: 'chlwldbs78@gmail.com',
  },
  {
    icon: <AiOutlineSend size={40} />,
    label: '피드백 주기',
  },
];

const Contact = (): ReactElement => {
  return (
    <div className="relative flex h-screen w-full flex-col gap-10">
      <SectionHeader title="Contact" />
      <div className="bg-bg box-shadow absolute top-[154px] my-10 flex h-[calc(100%-234px)] w-full flex-col items-center gap-10 rounded-lg p-20 lg:top-[100px]">
        <h2 className="text-bluePrimary text-2xl font-bold">봐주셔서 감사합니다!</h2>
        <p className="text-center text-xl break-keep">
          저와 함께하고 싶으시거나 궁금한 점이 있으시다면 언제든 연락 주세요 :)
        </p>
        <div className="flex h-full flex-col justify-evenly">
          {buttons.map(({ icon, label }, idx) => (
            <motion.button
              key={idx}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="flex w-full cursor-pointer items-center gap-5 rounded-xl border-1 border-black px-5 py-2"
            >
              {icon}
              <p>{label}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
