import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const Thumbnail = (): ReactElement => {
  const { scrollY } = useScroll();
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenHeight(window.innerHeight);
  }, []);

  const opacity = useTransform(scrollY, [0, screenHeight], [1, 0]);

  return (
    <div className="bg-bg sticky top-0 z-[-1]">
      <motion.div
        style={{ opacity }}
        className="flex h-screen w-full items-center justify-center px-[10%]"
      >
        <div className="text-bluePrimary">
          <p className="pl-2 text-sm lg:text-lg">2025.06.17</p>
          <div className="text-6xl font-black md:text-7xl lg:text-8xl">
            <p>FRONTEND</p>
            <p>DEVELOPER</p>
          </div>
          <div className="nowrap-ellipsis w-full pt-3 pl-1 text-[16px] md:text-xl lg:text-2xl">
            <p>
              저는 <span className="font-bold">도전</span>과 <span className="font-bold">성장</span>
              을 좋아하는 <span className="font-bold">끈기</span>있는 개발자입니다.
            </p>
          </div>
        </div>
        <img
          src="/images/thumbnail-profile.png"
          alt="profile-image"
          className="w-1/4 min-w-[150px] rounded-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default Thumbnail;
