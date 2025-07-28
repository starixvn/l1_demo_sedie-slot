import { Assets, Texture } from 'pixi.js';
import type { IAssetDefinition } from '@/types/game-types';

class AssetManager {
  private static instance: AssetManager;
  private loadedAssets = new Map<string, any>();
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  public async init(): Promise<void> {
    if (this.isInitialized) return;
    
    // Initialize PIXI Assets
    await Assets.init();
    this.isInitialized = true;
  }

  public async loadAssets(assetDefinitions: IAssetDefinition[]): Promise<void> {
    const assetsToLoad: Record<string, string> = {};
    
    for (const asset of assetDefinitions) {
      if (!this.loadedAssets.has(asset.name)) {
        assetsToLoad[asset.name] = asset.url;
      }
    }

    if (Object.keys(assetsToLoad).length === 0) return;

    try {
      const loadedAssets = await Assets.load(Object.keys(assetsToLoad));
      
      // Store loaded assets in cache
      for (const [name, asset] of Object.entries(loadedAssets)) {
        this.loadedAssets.set(name, asset);
      }
    } catch (error) {
      console.error('Failed to load assets:', error);
      throw new Error(`Asset loading failed: ${error}`);
    }
  }

  public getTexture(name: string): Texture {
    const asset = this.loadedAssets.get(name);
    if (!asset) {
      throw new Error(`Texture "${name}" not found. Make sure it's loaded first.`);
    }
    return asset as Texture;
  }

  public hasAsset(name: string): boolean {
    return this.loadedAssets.has(name);
  }

  public unloadAsset(name: string): void {
    if (this.loadedAssets.has(name)) {
      this.loadedAssets.delete(name);
      // Note: PIXI Assets will handle the actual cleanup
    }
  }

  public clearCache(): void {
    this.loadedAssets.clear();
  }

  public getLoadedAssetNames(): string[] {
    return Array.from(this.loadedAssets.keys());
  }
}

export const assetManager = AssetManager.getInstance(); 