import type { Application, Container, Sprite } from 'pixi.js';

// Game configuration constants
export const GAME_CONFIG = {
  WIDTH: 800,
  HEIGHT: 600,
  BACKGROUND_COLOR: 0x1099bb,
  MAX_FPS: 60,
  PHYSICS_STEP: 1 / 60,
} as const;

// Game states
export enum GameState {
  LOADING = 'loading',
  MENU = 'menu',
  PLAYING = 'playing',
  PAUSED = 'paused',
  GAME_OVER = 'game_over',
}

// Scene interface
export interface IScene {
  readonly name: string;
  readonly container: Container;
  isActive: boolean;
  init(): Promise<void>;
  update(deltaTime: number): void;
  destroy(): void;
  resize(width: number, height: number): void;
}

// Game entity interface
export interface IGameEntity {
  readonly id: string;
  readonly sprite: Sprite;
  position: { x: number; y: number };
  update(deltaTime: number): void;
  destroy(): void;
}

// Asset types
export interface IAssetDefinition {
  readonly name: string;
  readonly url: string;
  readonly type: 'texture' | 'sound' | 'font' | 'json';
}

// Game application interface
export interface IGameApplication {
  readonly pixiApp: Application;
  readonly currentScene: IScene | null;
  readonly gameState: GameState;
  
  init(): Promise<void>;
  loadScene(sceneName: string): Promise<void>;
  update(deltaTime: number): void;
  resize(): void;
} 