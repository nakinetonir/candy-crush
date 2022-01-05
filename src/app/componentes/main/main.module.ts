import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScoreComponent } from '../score/score.component';

@NgModule({
  declarations: [MainComponent, ScoreComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DragDropModule

  ],
  exports: [MainComponent, ScoreComponent]
})
export class MainModule { }
