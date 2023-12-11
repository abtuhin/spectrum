import useSensors from "@/hooks/useSensors";
import { waitFor, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import mockAxios from "axios";
 
 
jest.mock("axios")
mockAxios.get.mockResolvedValue({data: {
  velocity: 19.65939571698243,
  altitude: -45806.372935675514,
  temperature: 16.73887331880602,
  statusMessage: 'Key mission milestones achieved.',
  isAscending: true,
  isActionRequired: true
}})
 
describe('useSensor hook', () => {
  afterEach(jest.clearAllMocks);
 
  it("should return spectrum status data", async () => {
    // GIVEN // WHEN
    const queryClient = new QueryClient();
    const { result } = renderHook(() => useSensors({ onSuccess: jest.fn() }), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });
 
    // THEN
    await waitFor(() => {
      expect(result.current.data).not.toBeUndefined();
      expect(result.current.data.velocity).toBe(19.65939571698243);
      expect(result.current.data.altitude).toBe(-45806.372935675514);
      expect(result.current.data.temperature).toBe(16.73887331880602);
      expect(result.current.data.statusMessage).toBe('Key mission milestones achieved.');
      expect(result.current.data.isActionRequired).toBe(true);
      expect(result.current.data.isAscending).toBe(true);
    });
  });
})