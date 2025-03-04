export const getGroupConversation = () => {};

type Item = {
  id: string;
  label: string;
  createdTime: string;
};

type FormattedData = {
  date: string;
  content: Item[];
};

function formatDataByDate(items: Item[]): FormattedData[] {
  const now = new Date();
  const today = now.setHours(0, 0, 0, 0);
  const yesterday = new Date(today).setDate(new Date(today).getDate() - 1);
  const sevenDaysAgo = new Date(today).setDate(new Date(today).getDate() - 7);
  const thirtyDaysAgo = new Date(today).setDate(new Date(today).getDate() - 30);

  const categories: { [key: string]: Item[] } = {
    Today: [],
    Yesterday: [],
    'Previous 7 days': [],
    'Previous 30 days': [],
  };

  items.forEach((item) => {
    const createdDate = new Date(item.createdTime).setHours(0, 0, 0, 0);
    if (createdDate >= today) {
      categories['Today'].push(item);
    } else if (createdDate >= yesterday) {
      categories['Yesterday'].push(item);
    } else if (createdDate >= sevenDaysAgo) {
      categories['Previous 7 days'].push(item);
    } else if (createdDate >= thirtyDaysAgo) {
      categories['Previous 30 days'].push(item);
    }
  });

  return Object.entries(categories)
    .map(([date, content]) => ({ date, content }))
    .filter((entry) => entry.content.length > 0);
}

// 示例数据
const data = [
  {
    id: '1',
    label: '凡人修仙传',
    createdTime: '2025-02-19T09:58:31.482864300',
  },
  {
    id: '2',
    label: 'NSLookup使用与原理',
    createdTime: '2025-02-17T09:58:31.482864300',
  },
  {
    id: '3',
    label: 'Full-stack Enginerr at Fidelity',
    createdTime: '2025-02-14T09:58:31.482864300',
  },
  {
    id: '4',
    label: '宠物插图创作',
    createdTime: '2025-02-15T09:58:31.482864300',
  },
  {
    id: '5',
    label: '提取文字内容',
    createdTime: '2025-02-16T09:58:31.482864300',
  },
  {
    id: '6',
    label: '熊猪求饶插图',
    createdTime: '2025-01-03T09:58:31.482864300',
  },
  {
    id: '7',
    label: '提取文字内容',
    createdTime: '2025-01-01T09:58:31.482864300',
  },
];

console.log(JSON.stringify(formatDataByDate(data)));
