/**
 * Created by david on 06/10/2016.
 */
/**
 * TODO - should get its data from web response
 * @constructor
 */
var GameSettings = function () {

        this.gameTitle = "Test Game";
        this.players = [new Player("P1", "Human"), new Player("P2", "Human"), new Player("P3", "AI")];
        this.size = 4;
        this.dimensions = [6, 6];
        this.solution = [
            [0, 0], [1, 1], [2, 2], [3, 3]
        ];
        this.rowSlices = [
            [1], [1, 2], [], [2], [2], [2]
        ];
        this.columnSlices = [
            [1], [1, 2], [], [2], [1], [1, 1]
        ]
};