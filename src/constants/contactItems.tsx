import type { ReactNode } from 'react';
import IcGithub from '@/assets/icons/ic-github.svg?react';
import IcDiscord from '@/assets/icons/ic-discord.svg?react';
import IcMail from '@/assets/icons/ic-mail.svg?react';
import IcNotion from '@/assets/icons/ic-notion.svg?react';
import { Icon } from '@/components/common/Icon';

export type ContactItem = {
  id: string;
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
};

export const CONTACT_ITEMS: ReadonlyArray<ContactItem> = [
  {
    id: 'github',
    label: 'GitHub',
    value: 'cjiyun',
    href: 'https://github.com/cjiyun',
    icon: <Icon icon={<IcGithub />} size="32px" />,
  },
  {
    id: 'discord',
    label: 'Discord',
    value: 'czyoon',
    icon: <Icon icon={<IcDiscord />} size="32px" />,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'chlwldbs78@gmail.com',
    href: 'mailto:chlwldbs78@gmail.com',
    icon: <Icon icon={<IcMail />} size="32px" />,
  },
  {
    id: 'notion',
    label: 'Notion',
    value:
      'https://spangle-griffin-f97.notion.site/20f6e8c177368067bccef36291fc069e?source=copy_link',
    href: 'https://spangle-griffin-f97.notion.site/20f6e8c177368067bccef36291fc069e?source=copy_link',
    icon: <Icon icon={<IcNotion />} size="32px" />,
  },
] as const;
