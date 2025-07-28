import { Application, Container } from 'pixi.js';
import type { IGameApplication, IScene, GameState } from '@/types/game-types';
import { GAME_CONFIG } from '@/types/game-types';
import { GameScene } from '@/scenes/game-scene';
import { assetManager } from '@/systems/asset-manager';

export class GameApplication implements IGameApplication {
  public readonly pixiApp: Application;
  public currentScene: IScene | null = null;
  public gameState: GameState = 'loading' as GameState;

  private sceneContainer: Container;
  private scenes = new Map<string, IScene>();
  private isRunning = false;

  constructor() {
    // Initialize PIXI Application with performance optimizations
    this.pixiApp = new Application({
      width: GAME_CONFIG.WIDTH,
      height: GAME_CONFIG.HEIGHT,
      backgroundColor: GAME_CONFIG.BACKGROUND_COLOR,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      powerPreference: 'high-performance',
      eventMode: 'passive',
    });

    // Create scene container
    this.sceneContainer = new Container();
    this.sceneContainer.name = 'scene-container';
    this.pixiApp.stage.addChild(this.sceneContainer);

    // Register scenes
    this.registerScenes();
  }

  private registerScenes(): void {
    const gameScene = new GameScene();
    this.scenes.set(gameScene.name, gameScene);
  }

  public async init(): Promise<void> {
    try {
      // Initialize asset manager
      await assetManager.init();

      // Start with the game scene
      await this.loadScene('game-scene');

      // Set up game loop
      this.setupGameLoop();
      
      // Handle resize events
      this.setupResizeHandler();

      this.gameState = 'playing' as GameState;
      this.isRunning = true;

      console.log('Game initialized successfully!');
      console.log(`Canvas size: ${this.pixiApp.screen.width}x${this.pixiApp.screen.height}`);
    } catch (error) {
      console.error('Failed to initialize game:', error);
      throw error;
    }
  }

  public async loadScene(sceneName: string): Promise<void> {
    const scene = this.scenes.get(sceneName);
    if (!scene) {
      throw new Error(`Scene "${sceneName}" not found`);
    }

    // Clean up current scene
    if (this.currentScene) {
      this.sceneContainer.removeChild(this.currentScene.container);
      this.currentScene.destroy();
    }

    // Initialize and activate new scene
    await scene.init();
    this.sceneContainer.addChild(scene.container);
    this.currentScene = scene;
  }

  private setupGameLoop(): void {
    this.pixiApp.ticker.add((deltaTime) => {
      this.update(deltaTime);
    });

    // Optimize ticker for performance
    this.pixiApp.ticker.maxFPS = GAME_CONFIG.MAX_FPS;
  }

  public update(deltaTime: number): void {
    if (!this.isRunning || !this.currentScene) return;

    // Update current scene
    this.currentScene.update(deltaTime);
  }

  private setupResizeHandler(): void {
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  public resize(): void {
    // For now, keep fixed size as requested
    // In a production game, you'd implement responsive resizing here
    
    if (this.currentScene) {
      this.currentScene.resize(GAME_CONFIG.WIDTH, GAME_CONFIG.HEIGHT);
    }
  }

  public getCanvas(): HTMLCanvasElement {
    return this.pixiApp.view as HTMLCanvasElement;
  }

  public destroy(): void {
    this.isRunning = false;
    
    if (this.currentScene) {
      this.currentScene.destroy();
    }
    
    this.scenes.clear();
    this.pixiApp.destroy(true, { children: true, texture: true, baseTexture: true });
  }
} 