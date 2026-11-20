declare module "*.asset.json" {
  const asset: { url: string; asset_id: string; [key: string]: unknown };
  export default asset;
}
