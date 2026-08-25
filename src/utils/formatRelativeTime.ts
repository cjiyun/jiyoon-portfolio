export const formatRelativeTime = (createdAt: number, now: number = Date.now()) => {
  const diff = Math.max(0, now - createdAt);

  const min = 60_000;
  const hour = 60 * min;
  const day = 24 * hour;

  if (diff < min) return '방금 전';
  if (diff < hour) return `${Math.floor(diff / min)}분 전`;
  if (diff < day) return `${Math.floor(diff / hour)}시간 전`;
  return `${Math.floor(diff / day)}일 전`;
};
