// Adapted from the following Processing example:
// http://processing.org/learning/topics/follow3.html

// The amount of points in the path:
var points = 15;

// The distance between the points:
var length = 40;

var path = new Path({
  strokeColor: randomColors(),
  strokeWidth: 10,
  strokeCap: 'round',
});

var start = view.center / [10, 1];
for (var i = 0; i < points; i++)
  path.add(start + new Point(i * length, 0));
function onMouseMove(event) {
  path.firstSegment.point = event.point;
  for (var i = 0; i < points - 1; i++) {
    var segment = path.segments[i];
    var nextSegment = segment.next;
    var vector = segment.point - nextSegment.point;
    vector.length = length;
    nextSegment.point = segment.point - vector;
  }
  path.smooth({ type: 'continuous' });
}

window.onMouseDown = function onMouseDown(event) {
  path.fullySelected = true;
  path.strokeColor = '#FFF';
}

function randomColors() {
    var red = (Math.round(Math.random() * 127) + 127).toString(16);
    var green = (Math.round(Math.random() * 127) + 127).toString(16);
    var blue = (Math.round(Math.random() * 127) + 127).toString(16);
    return '#' + red + green + blue;
}

window.onMouseUp = function onMouseUp(event) {
  path.fullySelected = false;
  path.strokeColor = randomColors();
}

$(document).ready(function() {
  $(document).on('mousedown', '*', window.onMouseDown);
  $(document).on('mouseup', '*', window.onMouseUp);

  $("#button").click(function(event) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $("#portfolio").offset().top
      }, 600);
  });
  $("#landing-button").click(function(event) {
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $("#landing").offset().top
      }, 600);
  });
});
