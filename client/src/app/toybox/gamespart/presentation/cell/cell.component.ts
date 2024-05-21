import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule, BoardComponent],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css',
})
export class CellComponent implements OnInit {
  @Input()
  state: string;

  constructor() {}

  ngOnInit() {}
}
