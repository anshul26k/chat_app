import React, { useEffect, useState } from 'react';
import { fetchHealthStatus, HealthResponse } from '../api/health.client';

export const HealthStatus: React.FC = () => {
  const [data, setData] = useState<HealthResponse | null>(null);

  useEffect(() => {
    fetchHealthStatus().then(setData).catch(console.error);
  }, []);

  if (!data) return <div>Loading status...</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>System Health: {data.status}</h3>
      <p><strong>SHA:</strong> {data.version}</p>
      <p><strong>Runtime:</strong> {data.runtime}</p>
      <p><strong>Uptime:</strong> {data.uptime}s</p>
    </div>
  );
};