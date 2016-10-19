/**
 * Created by david on 23/09/2016.
 */
var GamePrefs = {
    DEBUG: true,
    DUMMY_LOBBY_DATA: {
        "users": [
            {
                "name": "koko",
                "type": "Human"
            },
            {
                "name": "yoko",
                "type": "Ai",
            },
            {
                "name": "shoko",
                "type": "Human",
            }],
        "games": [{
            "name": "Game for one",
            "size": 1,
            "players": [],
            "createdBy": "koko",
            "boardSize": {"x": 10, "y": 10},
            "settings": {
                "solution": [{"x": 3, "y": 1}, {"x": 8, "y": 1}, {"x": 2, "y": 2}, {
                    "x": 4,
                    "y": 2
                }, {"x": 8, "y": 2}, {"x": 1, "y": 3}, {"x": 2, "y": 3}, {"x": 3, "y": 3}, {
                    "x": 4,
                    "y": 3
                }, {"x": 5, "y": 3}, {"x": 8, "y": 3}, {"x": 3, "y": 4}, {"x": 8, "y": 4}, {
                    "x": 3,
                    "y": 5
                }, {"x": 8, "y": 5}, {"x": 3, "y": 6}, {"x": 8, "y": 6}, {"x": 3, "y": 7}, {
                    "x": 8,
                    "y": 7
                }, {"x": 3, "y": 8}, {"x": 6, "y": 8}, {"x": 7, "y": 8}, {"x": 8, "y": 8}, {
                    "x": 9,
                    "y": 8
                }, {"x": 10, "y": 8}, {"x": 3, "y": 9}, {"x": 7, "y": 9}, {"x": 9, "y": 9}, {
                    "x": 3,
                    "y": 10
                }, {"x": 8, "y": 10}],
                "gametype": "DynamicMultiPlayer",
                "dimensions": {"x": 10, "y": 10},
                "maxGameMoves": 15,
                "totalmoves": 15,
                "totalPlayers": 1,
                "gametitle": "Game for one",
                "columnSlices": [[1], [2], [1, 8], [2], [1], [1], [2], [8, 1], [2], [1]],
                "rowSlices": [[1, 1], [1, 1, 1], [5, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 5], [1, 1, 1], [1, 1]]
            },
            "id": 0,
            "$$hashKey": "object:382"
        }]
    }
};

var GameData = {
    gameTitle: "Test Game",
    players: [new Player("P1", "Human"), new Player("P2", "Human"), new Player("P3", "AI")],
    size: 4,
    dimensions: [6, 6],
    solution: [
        [0, 0], [1, 1], [2, 2], [3, 3]
    ],
    rowSlices: [
        [1], [1, 2], [], [2], [2], [2]
    ],
    columnSlices: [
        [1], [1, 2], [], [2], [1], [1, 1]
    ]
};
