import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  scoreValue: number

  @Input()
  public get score() {
    return this.scoreValue
  }
  public set score(score: number) {
    this.scoreValue = score
  }

  constructor() { }

  ngOnInit(): void {
  }

}
