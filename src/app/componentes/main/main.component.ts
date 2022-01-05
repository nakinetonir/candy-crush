import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']

})
export class MainComponent implements OnInit {
  width = 8
  color = [
    '/assets/images/blue-candy.png',
    '/assets/images/green-candy.png',
    '/assets/images/orange-candy.png',
    '/assets/images/purple-candy.png',
    '/assets/images/red-candy.png',
    '/assets/images/yellow-candy.png'
  ]
  blankImagen = '/assets/images/blank.png'
  pointerUp
  pointerDown
  randomColorArragment = []
  columnsOfThree = []
  rowsOfThree = []
  columnsOfFour = []
  rowsOfFour = []
  score: number = 0
  changeBlanks = false
  noValidRowTree = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
  noValidRowFour = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
  constructor(private cd: ChangeDetectorRef) {

  }


  ngOnInit(): void {
    this.createBoard()
    this.checkForColorRowOrFour()
    this.checkForColorOrFour()
    this.checkForColorRowOrThree()
    this.checkForColorOrThree()
    setTimeout(() => {
      this.moveIntoSquareBelow()
    }, 150)



  }
  createBoard = () => {
    for (let i = 0; i < this.width * this.width; i++) {
      const randomNumberFrom = Math.floor(Math.random() * this.color.length)
      const randomColor = this.color[randomNumberFrom]
      this.randomColorArragment.push(randomColor)
      this.cd.markForCheck()
    }

  }

  checkForColorOrThree = () => {
    for (let i = 0; i < 48; i++) {
      const columnsOfThree = [i, i + this.width, i + this.width * 2]
      const decidedColor = this.randomColorArragment[i]
      const isBlank = this.randomColorArragment[i] === this.blankImagen
      if (columnsOfThree.every(square => this.randomColorArragment[square] === decidedColor) && !isBlank) {
        columnsOfThree.forEach(square => this.randomColorArragment[square] = this.blankImagen)
        this.score += 3
      }
    }


  }

  checkForColorOrFour = () => {
    for (let i = 0; i < 40; i++) {
      const columnsOfFour = [i, i + this.width, i + this.width * 2, i + this.width * 3]
      const decidedColor = this.randomColorArragment[i]

      const isBlank = this.randomColorArragment[i] === this.blankImagen
      if (columnsOfFour.every(square => this.randomColorArragment[square] === decidedColor) && !isBlank) {
        columnsOfFour.forEach(square => this.randomColorArragment[square] = this.blankImagen)
        this.score += 4
      }
    }


  }

  checkForColorRowOrThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = this.randomColorArragment[i]
      if (this.noValidRowTree.includes(i)) continue
      const isBlank = this.randomColorArragment[i] === this.blankImagen
      if (rowOfThree.every(square => this.randomColorArragment[square] === decidedColor) && !isBlank) {
        rowOfThree.forEach(square => this.randomColorArragment[square] = this.blankImagen)
        this.score += 3
      }
    }


  }

  checkForColorRowOrFour = () => {
    for (let i = 0; i < 63; i++) {
      const rowsOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = this.randomColorArragment[i]

      if (this.noValidRowFour.includes(i)) continue
      const isBlank = this.randomColorArragment[i] === this.blankImagen
      if (rowsOfFour.every(square => this.randomColorArragment[square] === decidedColor) && !isBlank) {
        rowsOfFour.forEach(square => this.randomColorArragment[square] = this.blankImagen)
        this.score += 4
      }
    }


  }




  moveIntoSquareBelow = () => {

    this.changeBlanks = true
    for (let i = 0; i < this.width * this.width - this.width; i++) {

      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
      const isFirstRow = firstRow.includes(i)

      if (isFirstRow && this.randomColorArragment[i] === this.blankImagen) {
        let randomColor = Math.floor(Math.random() * this.color.length)
        this.randomColorArragment[i] = this.color[randomColor]
      }


      if (this.randomColorArragment[i + this.width] === this.blankImagen) {
        this.randomColorArragment[i + this.width] = this.randomColorArragment[i]
        this.randomColorArragment[i] = this.blankImagen
      }
    }

    if (this.randomColorArragment.includes(this.blankImagen)) {
      setTimeout(() => {
        this.moveIntoSquareBelow()
      }, 150)
    }
    else {
      const arrayTest = [...this.randomColorArragment]



      this.checkForColorRowOrFour()
      this.checkForColorOrFour()
      this.checkForColorRowOrThree()
      this.checkForColorOrThree()
      if (arrayTest.toString() !== this.randomColorArragment.toString()) {
        setTimeout(() => {
          this.moveIntoSquareBelow()
        }, 150)
      }
      else {
        this.changeBlanks = false
      }

    }





  }

  drop(e) {
    this.pointerUp = parseInt(e['item']['element']['nativeElement'].id)

  }







  @HostListener('document:mouseup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    const pointerDown = parseInt(event['path'][0].id)


    const validMoves = [
      this.pointerUp - 1,
      this.pointerUp - this.width,
      this.pointerUp + this.width,
      this.pointerUp + 1
    ]


    if (validMoves.includes(pointerDown) && !this.changeBlanks) {

      let beforeColor = this.randomColorArragment[this.pointerUp]
      let currentColor = this.randomColorArragment[pointerDown]
      this.randomColorArragment[pointerDown] = beforeColor
      this.randomColorArragment[this.pointerUp] = currentColor

      const arrayTest = [...this.randomColorArragment]

      this.checkForColorRowOrFour()
      this.checkForColorOrFour()
      this.checkForColorRowOrThree()
      this.checkForColorOrThree()

      if (arrayTest.toString() === this.randomColorArragment.toString()) {
        setTimeout(() => {
          this.randomColorArragment[pointerDown] = currentColor
          this.randomColorArragment[this.pointerUp] = beforeColor
        }, 400)

      }
      else {
        setTimeout(() => {
          this.moveIntoSquareBelow()
        }, 150)
      }







    }





  }



}
