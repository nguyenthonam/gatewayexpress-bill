export interface SenderData {
  name: string | null; // MR Thuận
  address1: string | null;
  address2: string | null;
  address3: string | null;
  phone: string;
}
export interface RecipientData {
  name: string | null;
  attention: string | null;
  address1: string | null;
  address2: string | null;
  address3: string | null;
  phone: string;
  country: string | null;
  city: string | null;
  state: string | null;
  postCode: string | null;
}
export interface PackageData {
  content: string | null;
  code: string | null;
  weight: number;
  PCEs: number;
  declaredValue: string;
  currency: string;
  dimensions?: [{ no: number; length: number; width: number; height: number; gross: number; volume: number }];
}
export interface BillData {
  customer: string; //FOCO
  GWERef: string; //GWE76683
  carrierRef: string; //xxx00005xxx
  carrier: string; // DHL SIN
  sender: SenderData;
  recipient: RecipientData;
  package: PackageData;
  note: string | null;
}
