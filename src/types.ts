export interface AppWindow {
  id: string;
  title: string;
  content: React.ReactNode;
  x: number;
  y: number;
  zIndex: number;
}
