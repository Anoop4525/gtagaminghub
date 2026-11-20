export type ProductCategory = 
  | 'gta6_editions' 
  | 'franchise_games' 
  | 'official_merch' 
  | 'gaming_accessories';

export type ProductFormat = 
  | 'Physical Code-in-Box'
  | 'Digital Download'
  | 'Digital Add-on'
  | 'Game'
  | 'Digital'
  | 'Bundle'
  | 'DLC / Standalone'
  | 'Compilation'
  | 'Remastered Collection'
  | 'Individual Game'
  | 'Classic Collection'
  | 'Classic'
  | 'Classic / Mobile'
  | 'Handheld / Mobile'
  | 'Classic Handheld'
  | 'Retro 2D'
  | 'Retro Expansion'
  | 'Monthly Subscription';

export interface ProductItem {
  id: string;
  catalogue_number: number;
  title: string;
  category: ProductCategory;
  subcategory: string;
  platform?: string;
  format?: string;
  edition_type?: string;
  merch_type?: string;
  hardware_type?: string;
  reference_url: string;
  affiliate_url: string;
  affiliate_network: string;
  commission_eligible: boolean;
  commission_rate_estimate?: string;
  is_available: boolean;
  release_status?: string;
  image_url?: string;
  notes?: string;
}
