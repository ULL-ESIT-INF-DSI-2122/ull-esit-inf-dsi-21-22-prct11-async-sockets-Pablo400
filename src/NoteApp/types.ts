export type RequestType = {
  user: string;
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  title?: string;
  body?: string;
  color?: string;
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Note[];
  error?: string;
}

export type Note = {
  title: string;
  body: string;
  color: string;
};
