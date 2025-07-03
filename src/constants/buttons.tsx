import type { IconType } from 'react-icons';
import { AiFillGithub, AiOutlineMail, AiOutlineSend } from 'react-icons/ai';

export interface ButtonData {
  Icon: IconType; // 컴포넌트 자체를 저장
  label: string;
  href: string;
}

export const buttons: ButtonData[] = [
  {
    Icon: AiFillGithub,
    label: 'cjiyun',
    href: 'https://github.com/cjiyun/',
  },
  {
    Icon: AiOutlineMail,
    label: 'chlwldbs78@gmail.com',
    href: 'mailto:chlwldbs78@gmail.com',
  },
  {
    Icon: AiOutlineSend,
    label: '피드백 주기',
    href: 'https://forms.gle/4kyzYmhzYtYPzLEG8',
  },
];
