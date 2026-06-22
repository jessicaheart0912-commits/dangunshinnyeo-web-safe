const globalStore = globalThis.__DANGUN_STORE__ || {
  reports: [],
  compatibilityReports: [],
  orders: [],
  payments: [],
  entitlements: [],
  users: [
    {
      id: 'guest-user',
      email: 'guest@dangun.local',
      name: '게스트',
      createdAt: new Date().toISOString()
    }
  ]
};

globalThis.__DANGUN_STORE__ = globalStore;

export function getStore() {
  return globalStore;
}

export function uid(prefix = 'id') {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

export function now() {
  return new Date().toISOString();
}
