export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  method: string;
  pricePerHour: number;
  availableDays: string[];
  credentials?: string;
  maxStudents?: number;
  packages?: string[];
  videoUrl?: string;
  uid: string;
}
