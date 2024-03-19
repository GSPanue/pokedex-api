import { EventEmitter } from 'events';

interface Config {
  filename: string;
  path: string;
}

interface File {
  descriptor: {
    path: string;
    pathType: 'local' | 'remote';
    name: string;
    format: string;
    mediatype?: string;
  };
  path: string;
  stream(options?: { end?: number }): NodeJS.ReadableStream | null;
  buffer: Promise<Buffer>;
  rows(options?: {
    keyed?: boolean;
    sheet?: string;
    size?: number;
  }): NodeJS.ReadableStream | null;
  addSchema(): Promise<void>;
}

interface RowStream extends EventEmitter {
  on(event: 'data', listener: (row: any[]) => void): this;
  on(event: 'end', listener: () => void): this;
  on(event: 'error', listener: (error: Error) => void): this;
}

export { Config, File, RowStream };
