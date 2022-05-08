export type RequestType = {
  user: string;
  type: 'add' | 'update' | 'remove' | 'read' | 'list' | 'userAdd';
  title?: string;
  body?: string;
  color?: string;
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list' | 'userAdd';
  success: boolean;
  user?: string,
  notes?: Note[];
  error?: string;
}

export type Note = {
  title: string;
  body: string;
  color: string;
};
