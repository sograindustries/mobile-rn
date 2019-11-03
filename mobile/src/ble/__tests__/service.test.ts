import { makeService } from '../service';

describe('service', () => {
  describe('connect', () => {
    it('should return device', async () => {
      const expectedDevice = { field1: 'value1' };
      const mockManager = {
        startDeviceScan: jest.fn().mockResolvedValue(expectedDevice)
      } as any;

      const service = makeService(mockManager);
      const device = await service.scan();

      expect(device).toEqual(expectedDevice);
    });
  });
});
