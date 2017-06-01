const basePosition = 800;
const paragraphs = document.getElementsByTagName('P');

for (let i = 0; i < paragraphs.length; i+= 1) {
  const paragraph = paragraphs[i];
  paragraph.firstElementChild.classList.add('hide');
  paragraph.setAttribute('id', `paragraph_${i}`);
}

const lines = Array.from(paragraphs).map((paragraph) => {
  const draw = SVG(paragraph.getAttribute('id')).size(basePosition - 1, '1.7em');
  const line = draw.rect('1em', '.4em').attr({ x: basePosition, y: '.7em', fill: '#d2fed3' });

  return { drawArea: draw, paragraph, line, text: paragraph.firstElementChild.innerText };
});

setTimeout(() => { animate(lines); }, 1000);

function animate(lines) {
  if (lines && lines.length > 0) {
    const lineObj = lines.shift();
    const lineAnimationSpeed = lineObj.paragraph.firstElementChild.clientWidth * 2;
    const lineLength = lineObj.paragraph.firstElementChild.clientWidth;

    lineObj.line
      .animate({ duration: 150, ease: '-' })
      .width(basePosition)
      .move(0, '.7em')
      .queue(() => {
        const marker = lineObj
          .drawArea
          .rect('.2em', '1.7em')
          .attr({ x: 0, y: 0, fill: '#d2fed3' });

        marker.animate({ duration: lineAnimationSpeed, ease: '-' })
          .move(lineLength, 0)
          .once(1, () => { marker.addClass('hide'); });

        lineObj.line.attr({ y: 0 }).height('1.7em');
        lineObj.line.style({ fill: '#000000' });
        lineObj.paragraph.firstElementChild.classList.remove('hide');
        lineObj.line.fx.dequeue();
      })
      .animate({ duration: lineAnimationSpeed + 20, ease: '-' })
      .size(0, '1.5em')
      .move(lineLength, 0)
      .delay(300)
      .queue(() => {
        lineObj.line.fx.dequeue();
        animate(lines);
      }
    );
  }
}
