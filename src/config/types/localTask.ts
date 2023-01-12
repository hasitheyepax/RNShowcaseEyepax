export type localTask = {
  id: string;
  title: string;
  description: string;
  createdTimestamp: number;
  type: "note" | "todo";
  completed?: boolean;
  completedTimestamp?: number;
};
