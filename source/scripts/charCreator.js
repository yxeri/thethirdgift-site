const drawContainer = document.getElementById('draw');
const drawArea = SVG(document.createDocumentFragment());

const circle = createCircle({ x: 150, y: 150, radius: 75 });
const secondCircle = createCircle({ x: 250, y: 250, radius: 75 });
const thirdCircle = createCircle({ x: 350, y: 350, radius: 75 });

lineConnection({ obj1: circle, obj2: secondCircle, relationType: 'friendly' });
lineConnection({ obj1: secondCircle, obj2: thirdCircle, relationType: 'enemy' });

drawContainer.appendChild(drawArea.node);

function lineConnection({ obj1, obj2, relationType }) {
  const line = drawArea.line(obj1.node.node.getAttribute('cx'), obj1.node.node.getAttribute('cy'), obj2.node.node.getAttribute('cx'), obj2.node.node.getAttribute('cy'));

  if (relationType === 'friendly') {
    line.stroke({ color: 'green', width: 5 });
  } else if (relationType === 'enemy') {
    line.stroke({ color: 'red', width: 5 });
  } else {
    line.stroke({ color: 'white', width: 5 });
  }

  obj1.connectedTo.push({ otherObject: obj2, line });
  obj2.connectedTo.push({ otherObject: obj1, line });
  line.back();
}

function createCircle({ x, y, radius }) {
  const circle = {
    node: drawArea.circle(radius).stroke({ color: 'white', width: 5 }).move(x, y),
    connectedTo: [],
  };
  const pattern = drawArea.pattern('100%', '100%', (add) => {
    add.image('./images/circle.jpg', 1, 1).attr({ preserveAspectRatio: 'xMidYMid slice' });
  }).attr({
    viewBox: '0 0 1 1',
    patternUnits: 'objectBoundingBox',
    patternContentUnits: 'objectBoundingBox',
    preserveAspectRatio: 'xMidYMid slice',
  });

  circle.node.fill(pattern);

  circle.node.click(() => {
    circle.node.stroke({ color: 'blue', width: 5 });
  });
  circle.node.draggable().on('dragmove', () => {
    circle.connectedTo.forEach(({ otherObject, line }) => {
      line.plot(circle.node.node.getAttribute('cx'), circle.node.node.getAttribute('cy'), otherObject.node.node.getAttribute('cx'), otherObject.node.node.getAttribute('cy'))
    });
  });

  return circle;
}
