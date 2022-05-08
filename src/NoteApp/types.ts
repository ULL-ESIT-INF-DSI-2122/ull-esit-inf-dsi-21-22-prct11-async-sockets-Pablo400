/**
 * Client request
 */
export type RequestType = {
  user: string;
  type: 'add' | 'update' | 'remove' | 'read' | 'list' | 'userAdd';
  title?: string;
  body?: string;
  color?: string;
}

/**
 * Server response
 */
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list' | 'userAdd';
  success: boolean;
  user?: string,
  notes?: Note[];
  error?: string;
}

/**
 * Note type
 */
export type Note = {
  title: string;
  body: string;
  color: string;
};
