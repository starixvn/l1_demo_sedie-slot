import { Container, Graphics } from 'pixi.js';
import type { IScene } from '@/types/game-types';
import { GAME_CONFIG } from '@/types/game-types';

export class GameScene implements IScene {
  public readonly name = 'game-scene';
  public readonly container: Container;
  public isActive = false;

  private testGraphics: Graphics | null = null;
  private rotationSpeed = 0.01;
  private elapsed = 0;

  constructor() {
    this.container = new Container();
    this.container.name = this.name;
  }

  public async init(): Promise<void> {
    // Create test graphics for verification
    this.createTestGraphics();
    this.isActive = true;
  }

  private createTestGraphics(): void {
    this.testGraphics = new Graphics();
    
    // Create a white circle for testing
    this.testGraphics.beginFill(0xffffff);
    this.testGraphics.drawCircle(0, 0, 50);
    this.testGraphics.endFill();
    
    // Position at center of screen
    this.testGraphics.x = GAME_CONFIG.WIDTH / 2;
    this.testGraphics.y = GAME_CONFIG.HEIGHT / 2;
    
    // Add interactive properties for future touch/click handling
    this.testGraphics.eventMode = 'static';
    this.testGraphics.cursor = 'pointer';
    
    this.container.addChild(this.testGraphics);
  }

  public update(deltaTime: number): void {
    if (!this.isActive || !this.testGraphics) return;

    // Smooth rotation animation
    this.elapsed += deltaTime;
    this.testGraphics.rotation = this.elapsed * this.rotationSpeed;
  }

  public resize(width: number, height: number): void {
    if (this.testGraphics) {
      this.testGraphics.x = width / 2;
      this.testGraphics.y = height / 2;
    }
  }

  public destroy(): void {
    this.isActive = false;
    
    if (this.testGraphics) {
      this.testGraphics.destroy();
      this.testGraphics = null;
    }
    
    this.container.removeChildren();
  }
} 