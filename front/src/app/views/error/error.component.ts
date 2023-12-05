import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import {TetrisCoreComponent} from 'ngx-tetris';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements AfterViewInit {
  ngAfterViewInit(): void {
  }

  @ViewChild('game')
  private _tetris: TetrisCoreComponent = undefined as any;

  public bw = false;
  public moveLeft = false;
  public moveDown = false;
  public moveRight = false;
  public rotate = false;
  public start = false;
  public stop = false;
  public reset = false;
  public currentScore: number = 0;
  isMuted: boolean = false;

  toggleMute() {
    const gameMusic = document.getElementById('gameMusic') as HTMLAudioElement;
    const gameMusic2 = document.getElementById('gameMusic2') as HTMLAudioElement;

    if (gameMusic && gameMusic2) {
      this.isMuted = !this.isMuted;

      gameMusic.muted = this.isMuted;
      gameMusic2.muted = this.isMuted;
    }
  }
  updateScore(newScore: number) {
    this.currentScore = newScore;
}
  onLineCleared() {
  
    console.log('line cleared');

  }
  
 
  public onGameOver() {
      alert('game over');
      this._tetris.actionReset();


  }
 
  
  public onRotateButtonPressed() {
      this._tetris.actionRotate();
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this._tetris.actionLeft();
        break;
      case 'ArrowRight':
        this._tetris.actionRight();
        break;
      case 'ArrowUp':
        this._tetris.actionRotate();
        break;
      case 'ArrowDown':
        this._tetris.actionDown();
        break;
        case ' ': // Space key for starting the game
        this._tetris.actionStart();
        break;
      case 'p': // 'p' key for stopping the game
        this._tetris.actionStop();
        break;
      case 'r': // 'r' key for resetting the game
        this._tetris.actionReset();
        break;
        case 'd': // 'd' key for resetting the game
        this._tetris.actionDrop();
        break;

    }
  }


}
