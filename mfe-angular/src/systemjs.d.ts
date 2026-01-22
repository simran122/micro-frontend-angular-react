interface SystemJS {
  import(name: string): Promise<any>;
  register(name: string, deps: string[], declare: Function): void;
  resolve(name: string): Promise<string>;
}

declare var System: SystemJS;
