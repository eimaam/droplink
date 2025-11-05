export enum DropVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum DropType {
  FILE = 'file',
  TEXT = 'text',
}

export enum DropStatus {
  ACTIVE = 'active',
  EXPIRING = 'expiring',
  EXPIRED = 'expired',
}

export interface Drop {
  _id: string;
  name: string;
  type: DropType;
  size: string;
  fileType?: string;
  link: string;
  expiresIn: string;
  expiryDate: string;
  expiryTimestamp: number;
  visibility: DropVisibility;
  downloads: number;
  views: number;
  createdAt: string;
  status: DropStatus;
  isPasswordProtected: boolean;
  content?: string; // For text drops
  previewUrl?: string;
  userId: string;
}

export interface CreateDropDTO {
  name: string;
  type: DropType;
  size?: string;
  fileType?: string;
  visibility: DropVisibility;
  expiryDuration: number; // in milliseconds
  password?: string;
  content?: string; // For text drops
  file?: File | ArrayBuffer | Blob;
}

export interface UpdateDropDTO {
  name?: string;
  visibility?: DropVisibility;
  password?: string;
}

export interface DropStats {
  totalDrops: number;
  activeDrops: number;
  expiredDrops: number;
  totalDownloads: number;
  totalViews: number;
  publicDrops: number;
  privateDrops: number;
}
