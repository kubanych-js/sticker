export type Template = 'classic' | 'fleet' | 'heavy' | 'custom';
export type StickerColor = 'bw' | 'bk' | 'yw';
export type Side = 'driver' | 'passenger';
export type Mode = 'design' | 'upload';
export type StickerSize = 'A' | 'B' | 'C';
export type ShippingMethod = 'standard' | 'express';

export interface BuilderState {
  mode: Mode;
  name: string;
  usdot: string;
  mc: string;
  noMc: boolean;
  tagline: string;
  template: Template;
  color: StickerColor;
  side: Side;
  uploadUrl: string | null;
  uploadName: string | null;
}

export interface AddressState {
  name: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface OrderState {
  size: StickerSize;
  sizePrice: number;
  qty: number;
  ship: ShippingMethod;
  shipPrice: number;
  address: AddressState;
}

export interface SuccessData {
  orderNum: string;
  email: string;
  ship: ShippingMethod;
  shipEta: string;
  total: string;
  name: string;
  usdot: string;
  mc: string;
  size: StickerSize;
  qty: number;
  mode: Mode;
  uploadUrl: string | null;
}
