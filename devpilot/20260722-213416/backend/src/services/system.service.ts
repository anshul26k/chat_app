import { execSync } from 'child_process';

export class SystemService {
  public static getGitSha(): string {
    if (process.env.GIT_COMMIT_SHA) return process.env.GIT_COMMIT_SHA;
    try {
      return execSync('git rev-parse HEAD').toString().trim();
    } catch (e) {
      return 'unknown';
    }
  }

  public static getSystemStatus() {
    return {
      status: 'UP',
      uptime: Math.floor(process.uptime()),
      runtime: `Node.js ${process.version}`,
      version: this.getGitSha(),
      timestamp: new Date().toISOString()
    };
  }
}