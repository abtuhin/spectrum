import useSensors from "@/hooks/useSensors";
import { waitFor, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

global.fetch = jest.fn();

describe('useSensor hook', () => {
  beforeEach(() => {
    global.fetch.mockResolvedValue({
      json: jest.fn(),
    });
  });

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
      expect(result.current.data.velocity).not.toBeUndefined();
      expect(result.current.data.altitude).not.toBeUndefined();
      expect(result.current.data.temperature).not.toBeUndefined();
      expect(result.current.data.statusMessage).not.toBeUndefined();
      expect(result.current.data.isActionRequired).not.toBeUndefined();
      expect(result.current.data.isAscending).not.toBeUndefined();
    });
  });
})
