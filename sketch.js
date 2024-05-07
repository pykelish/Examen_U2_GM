let laPazOffset = -7;
let mexicoCityOffset = -9;
let barcelonaOffset = 2;

let laPazHour = 0;
let laPazMinute = 0;
let laPazSecond = 0;

let inputTime;
let button;

let hourAngle = 0;
let minuteAngle = 0;
let secondAngle = 0;

function setup() {
  createCanvas(800, 350);
  inputTime = createInput('00:00');
  inputTime.position(20, 20);

  button = createButton('Actualizar');
  button.position(150, 20);
  button.mousePressed(updateTime);

  updateClock();
  setInterval(updateClock, 1000);
}

function drawClock(x, y, hourAngle, minuteAngle, secondAngle, cityName, algorithm) {
  let radius = 80;

  if (algorithm === "PuntoMedio") {
    let xc = x;
    let yc = y;
    let p = 1 - radius;
    let x1 = 0;
    let y1 = radius;

    while (x1 <= y1) {
      point(xc + x1, yc + y1);
      point(xc - x1, yc + y1);
      point(xc + x1, yc - y1);
      point(xc - x1, yc - y1);
      point(xc + y1, yc + x1);
      point(xc - y1, yc + x1);
      point(xc + y1, yc - x1);
      point(xc - y1, yc - x1);

      if (p < 0) {
        x1++;
        p += 2 * x1 + 1;
      } else {
        x1++;
        y1--;
        p += 2 * (x1 - y1) + 1;
      }
    }
  } else if (algorithm === "DDA") {
    for (let i = 0; i < 360; i++) {
      let angle = radians(i);
      let xpos = x + cos(angle) * radius;
      let ypos = y + sin(angle) * radius;
      point(xpos, ypos);
    }
  } else if (algorithm === "Bresenham") {
    let xc = x;
    let yc = y;
    let p = 1 - radius;
    let x1 = 0;
    let y1 = radius;

    while (x1 <= y1) {
      point(xc + x1, yc + y1);
      point(xc - x1, yc + y1);
      point(xc + x1, yc - y1);
      point(xc - x1, yc - y1);
      point(xc + y1, yc + x1);
      point(xc - y1, yc + x1);
      point(xc + y1, yc - x1);
      point(xc - y1, yc - x1);

      if (p < 0) {
        x1++;
        p += 2 * x1 + 1;
      } else {
        x1++;
        y1--;
        p += 2 * (x1 - y1) + 1;
      }
    }
  }

  textSize(12);
  textAlign(CENTER, CENTER);
  for (let i = 1; i <= 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI);
    let xpos = x + cos(angle - HALF_PI) * (radius - 15);
    let ypos = y + sin(angle - HALF_PI) * (radius - 15);
    text(i, xpos, ypos);
  }

  let secondHandLength = radius * 0.8;
  let secondX = x + cos(secondAngle) * secondHandLength;
  let secondY = y + sin(secondAngle) * secondHandLength;
  strokeWeight(1);
  line(x, y, secondX, secondY);
  
  let minuteHandLength = radius * 0.7;
  let minuteX = x + cos(minuteAngle) * minuteHandLength;
  let minuteY = y + sin(minuteAngle) * minuteHandLength;
  strokeWeight(2);
  line(x, y, minuteX, minuteY);

  let hourHandLength = radius * 0.5;
  let hourX = x + cos(hourAngle) * hourHandLength;
  let hourY = y + sin(hourAngle) * hourHandLength;
  strokeWeight(4);
  line(x, y, hourX, hourY);

  textSize(15);
  textAlign(CENTER, TOP);
  textFont('Arial');
  text(cityName, x, y + radius + 20);
}

function draw() {
  background(255);
  drawClock(width / 4, height / 2, hourAngle, minuteAngle, secondAngle, "L a  P a z", "PuntoMedio");
  drawClock(2 * width / 4, height / 2, hourAngle + radians(15) * (laPazOffset - mexicoCityOffset), minuteAngle + radians(0.25) * (laPazOffset - mexicoCityOffset), secondAngle, "C i u d a d  d e  M é x i c o", "DDA");
  drawClock(3 * width / 4, height / 2, hourAngle + radians(90) * (laPazOffset - barcelonaOffset), minuteAngle + radians(1.5) * (laPazOffset - barcelonaOffset), secondAngle, "B a r c e l o n a", "Bresenham");
}


function updateClock() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  secondAngle = map(seconds, 0, 60, 0, TWO_PI) - HALF_PI;
  hourAngle = map((hours % 12) + minutes / 60, 0, 12, 0, TWO_PI) - HALF_PI;

  let laPazHourAngle = map((laPazHour + laPazMinute / 60) % 12, 0, 12, 0, TWO_PI) - HALF_PI;

  hourAngle = laPazHourAngle;

  if (seconds === 0) {
    minuteAngle = map((laPazMinute) % 60, 0, 60, 0, TWO_PI) - HALF_PI;
  }

  if (seconds === 59) {
    laPazMinute++;
    minuteAngle = map((laPazMinute % 60) + seconds / 60, 0, 60, 0, TWO_PI) - HALF_PI;
  }
}

function updateTime() {
  let time = inputTime.value();
  let parts = time.split(':');
  laPazHour = int(parts[0]);
  laPazMinute = int(parts[1]);
  minuteAngle = map(laPazMinute, 0, 60, 0, TWO_PI) - HALF_PI;
}
