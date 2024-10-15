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
  }

  onVSwipe(detail: GestureDetail){
    console.log("Vertical");
    console.log(detail);    
  }

}
