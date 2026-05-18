export const TASK_STATUSES = [
  {
    id: 'TODO',
    title: 'Cần làm',
    label: 'Cần làm',
    shortLabel: 'TODO',
    progress: 0,
    badgeBg: 'bg-[#fcf8ff]',
    badgeText: 'text-[#767586]',
  },
  {
    id: 'IN_PROGRESS',
    title: 'Đang làm',
    label: 'Đang làm',
    shortLabel: 'ĐANG LÀM',
    progress: 65,
    badgeBg: 'bg-[#e1e0ff]',
    badgeText: 'text-[#3537c0]',
  },
  {
    id: 'DONE',
    title: 'Hoàn thành',
    label: 'Hoàn thành',
    shortLabel: 'DONE',
    progress: 100,
    badgeBg: 'bg-[#e2fbe8]',
    badgeText: 'text-[#128a31]',
  },
];

export const getTaskStatus = (status) => {
  const normalizedStatus = status === 'REVIEW' ? 'IN_PROGRESS' : status;
  return TASK_STATUSES.find((item) => item.id === normalizedStatus) || TASK_STATUSES[0];
};
