/**
 * Created by david on 23/09/2016.
 */
var GamePrefs = {
  DEBUG: true
};

var GameData = {
  gameTitle:"Test Game",
  players:[new Player("P1","Human"),new Player("P2","Human"),new Player("P3","AI")],
  size:4,
  dimensions: [6, 6],
  solution: [
    [0, 0], [1, 1], [2, 2], [3, 3]
  ],
  rowSlices: [
    [1], [1, 2], [], [2],[2],[2]
  ],
  columnSlices: [
    [1], [1, 2], [], [2],[1],[1,1]
  ]
};
