import useSpectrumAction from "@/hooks/useSpectrumAction";
import dataService from "@/service/dataService";
import { waitFor, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

jest.mock('@/service/dataService');

describe('useSpectrumAction hook', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return spectrum status data", async () => {
    // GIVEN // WHEN
    dataService.actOnSensor.mockResolvedValueOnce();
    const queryClient = new QueryClient();
    const { result } = renderHook(() => useSpectrumAction(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    // THEN
    await waitFor(() => {
      expect(dataService.actOnSensor).toHaveBeenCalledTimes(1);
    });
  });
})
