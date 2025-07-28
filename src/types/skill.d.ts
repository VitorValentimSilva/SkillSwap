export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  method: string;
  hourlyRate: number;
  daysAvailable: string[];
  timesAvailable: Array<{
    day: string;
    times: string[];
  }>;
  credentials?: string;
  maxStudents?: string;
  packages?: string;
  videoUrl?: string;
  uid: string;
}
