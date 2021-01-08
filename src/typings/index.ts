// View sor data interface
export interface Isor {
  date: number;
  observation: string;
  risk: number;
  classify: string;
  color: string;
  type: string;
  location: string;
}
export interface Imessage {
  name: string;
  image: string;
  notseen: number;
  isonline: boolean;
  userId: number;
}
