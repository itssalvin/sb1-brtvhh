export interface Task {
  id: number;
  title: string;
  completed: boolean;
  tags: string[];
}

export interface Inspiration {
  id: number;
  content: string;
  tags: string[];
}