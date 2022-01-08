export interface involved_persons {
  _id: string;
  email: string;
  name: string;
  img_url: string;
}

export interface actions {
  _id: string;
  assigned_to: string;
  category: string;
  content: string;
  date: string;
  default: Array<any>;
  is_complete: boolean;
  is_selected: boolean;
}
