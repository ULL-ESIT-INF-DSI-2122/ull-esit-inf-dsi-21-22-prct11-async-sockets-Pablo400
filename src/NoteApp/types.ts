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
}

export type Note = {
  type: string;
  body: string;
  color: string;
};
