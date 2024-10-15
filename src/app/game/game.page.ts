import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Cell } from '../models/cell';
import { GestureController, GestureDetail } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements AfterViewInit {

  @ViewChild('boardGame', {read: ElementRef})
  boardGame: ElementRef;

  public board: Cell[][]; // Matriz de celdas

  public rows: number[];
  public cols: number[];

  private direction: number;

  private DIRECTION_UP = 0;
  private DIRECTION_DOWN = 1;
  private DIRECTION_LEFT = 2;
  private DIRECTION_RIGHT = 3;
  

  constructor(
    private gestureController: GestureController
  ) { 

    this.board = [
      [null, null, null, null], 
      [null, null, null, null], 
      [null, null, null, null],
      [null, null, null, null]
    ];
    this.rows = Array(4).fill(0);
    this.cols = Array(4).fill(0);
    this.generateRandomNumber();
    this.generateRandomNumber();

  }
  ngAfterViewInit(): void {

    const hSwipe = this.gestureController.create({
      el: this.boardGame.nativeElement,
      gestureName: 'hswipe',
      maxAngle: 30,
      direction: 'x',
      onEnd: (detail) => this.onHSwipe(detail)
    }, true)

    const vSwipe = this.gestureController.create({
      el: this.boardGame.nativeElement,
      gestureName: 'vswipe',
      maxAngle: 30,
      direction: 'y',
      onEnd: (detail) => this.onVSwipe(detail)
    }, true)

    vSwipe.enable();
    hSwipe.enable();

  }

  onHSwipe(detail: GestureDetail){
    console.log("Horizontal");
    console.log(detail);   
    
    if(detail.deltaX < 0){
      console.log("Izquierda");
      this.direction = this.DIRECTION_LEFT;
      this.moveLeft();
    } else {
      console.log("Derecha");
      this.direction = this.DIRECTION_RIGHT;
      this.moveRight();
    }
    
  }

  onVSwipe(detail: GestureDetail){
    console.log("Vertical");
    console.log(detail);
    
    if(detail.deltaX < 0){
      console.log("Arriba");
      this.direction = this.DIRECTION_UP;
      this.moveUp();
    } else {
      console.log("Abajo");
      this.direction = this.DIRECTION_DOWN;
      this.moveDown();
    }
    
  }

  generateRandomNumber(){
    let row = 0;
    let col = 0;

    do {
      row = Math.floor(Math.random() * this.board.length);
      col = Math.floor(Math.random() * this.board[0].length);
    } while (this.board[row][col] !== null);

    this.board[row][col] = new Cell();

    const probNum4 = Math.floor(Math.random() * 100) + 1;

    if(probNum4 <= 25){
      this.board[row][col].value = 4;
    } else {
      this.board[row][col].value = 2;
    }

  }

  moveLeft(){
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 1; j < this.board[i].length; j++) {
        
      }    
    }
  }

  moveRight(){
    for (let i = 0; i < this.board.length; i++) {
      for (let j = this.board[i].length - 2; j >= 0; j--) {
        
      }    
    }
  }

  moveUp(){
    for (let i = 1; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        
      }    
    }
  }

  moveDown(){
    for (let i = this.board.length; i >= 0; i--) {
      for (let j = 0; j < this.board[i].length; j++) {
        
      }    
    }
  }

  nextPositionFree(rowOri: number, colOri: number, numberOriginal: number){
    let rowNew: number;
    let colNew: number;
    let found: boolean;

    switch(this.direction){
      case this.DIRECTION_LEFT:
        rowNew = rowOri;
        for (let j = colOri - 1; j >= 0 && !found; j--) {
          if(this.board[rowOri][j] != null){
            found = true;

            if (this.board[rowOri][j].blocked) {
              colNew = j + 1;
            } else if(this.board[rowOri][j].value == numberOriginal) {
              colNew = j;
            } else if ( (j + 1) != colOri) {
              colNew = j + 1;
            }

          }  
        }

        if(!found){
          colNew = 0;
        }

      break;
      case this.DIRECTION_RIGHT:
        rowNew = rowOri;
        for (let j = colOri + 1; j < this.board[rowOri].length && !found; j++) {
          if(this.board[rowOri][j] != null){
            found = true;

            if (this.board[rowOri][j].blocked) {
              colNew = j - 1;
            } else if(this.board[rowOri][j].value == numberOriginal) {
              colNew = j;
            } else if ( (j - 1) != colOri) {
              colNew = j - 1;
            }

          }
  
        }

        if(!found){
          colNew = this.board[rowOri].length - 1;
        }

      break;
      case this.DIRECTION_UP:
        colNew = colOri;
        for (let i = rowOri - 1; i >= 0 && !found; i--) {
          if(this.board[i][colOri] != null){
            found = true;

            if (this.board[i][colOri].blocked) {
              rowNew = i + 1;
            } else if(this.board[i][colOri].value == numberOriginal) {
              rowNew = i;
            } else if ( (i + 1) != rowOri) {
              rowNew = i + 1;
            }

          }
        }

        if(!found){
          rowNew = 0;
        }

      break;
      case this.DIRECTION_DOWN:
        colNew = colOri;
        for (let i = rowOri + 1; i < this.board.length && !found; i++) {
          if(this.board[i][colOri] != null){
            found = true;

            if (this.board[i][colOri].blocked) {
              rowNew = i - 1;
            } else if(this.board[i][colOri].value == numberOriginal) {
              rowNew = i;
            } else if ( (i - 1) != rowOri) {
              rowNew = i - 1;
            }

          }
          
        }

        if(!found){
          rowNew = this.board.length - 1;
        }

      break;
    }

    if (rowNew !== undefined && colNew !== undefined) {
      return [rowNew, colNew];
    }

    return null;

  }

}
