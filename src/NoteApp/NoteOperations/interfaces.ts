/**
 * Add note interface
 */
export interface addNoteInterface {
  addNote(user: string, title: string, body: string, noteColor: string): void;
}

/**
 * Add user directory interface
 */
export interface addUserDirectoryInterface {
  addUserDirectory(username: string): void;
}

/**
 * List notes interface
 */
export interface listNotesInterface {
  listNotes(user: string): void;
}

/**
 * Modify notes interface
 */
export interface modifyNoteInterface {
  modifyNote(user: string, title: string, body: string): void;
}

/**
 * Read notes interface
 */
export interface readNoteInterface {
  readNote(user: string, title: string): void;
}

/**
 * Remove note interface
 */
export interface removeNoteInterface {
  removeNote(user: string, title: string): void;
}

/**
 * Chlak Color interface
 */
export interface chalkColorInterface {
  getColor(color: string, print: string): string | undefined;
}
