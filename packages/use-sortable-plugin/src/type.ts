import { FormTableNormalPlugin } from '@ahooksjs/use-table';

export interface IOptions {
  sortByKey?: string;
  sortOrderKey?: string;
  multiple?: boolean;
  transformer?<T>(res: T): T;
}

export type TUseSortablePlugin = (options?: IOptions) => FormTableNormalPlugin;