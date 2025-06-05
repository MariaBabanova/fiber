const { login, getDeviceStats, sendDeviceCommand } = require('./api');

global.fetch = jest.fn();
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

describe('API module', () => {
  afterEach(() => {
    fetch.mockClear();
    localStorage.getItem.mockReset();
  });

  describe('login', () => {
    it('should return token on successful login', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'abc123' }),
      });

      const result = await login('user', 'pass');
      expect(result.token).toBe('abc123');
    });

    it('should throw error on failed login', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Invalid credentials' }),
      });

      await expect(login('user', 'wrongpass')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('getDeviceStats', () => {
    it('should return stats when authorized', async () => {
      localStorage.getItem.mockReturnValue('token123');

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ voltage: 12.5 }),
      });

      const data = await getDeviceStats();
      expect(data.voltage).toBe(12.5);
    });

    it('should throw on unauthorized access', async () => {
      localStorage.getItem.mockReturnValue('badtoken');

      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Unauthorized' }),
      });

      await expect(getDeviceStats()).rejects.toThrow('Unauthorized');
    });
  });

  describe('sendDeviceCommand', () => {
    it('should succeed on valid command', async () => {
      localStorage.getItem.mockReturnValue('token123');

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({}), // mock empty JSON for success
      });

      await expect(sendDeviceCommand('on')).resolves.toBeUndefined();
    });

    it('should throw on command failure', async () => {
      localStorage.getItem.mockReturnValue('token123');

      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Command failed' }),
      });

      await expect(sendDeviceCommand('off')).rejects.toThrow('Command failed');
    });
  });
});
