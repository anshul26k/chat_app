export interface HealthResponse {
  status: string;
  uptime: number;
  runtime: string;
  version: string;
  timestamp: string;
}

export const fetchHealthStatus = async (): Promise<HealthResponse> => {
  const response = await fetch('/api/health');
  if (!response.ok) throw new Error('Health check failed');
  return response.json();
};