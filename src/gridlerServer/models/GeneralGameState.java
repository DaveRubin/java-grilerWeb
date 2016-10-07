package gridlerServer.models;

import core.controllers.Game;
import core.controllers.player.ComputerPlayer;
import core.controllers.player.Player;
import gridlerServer.Constants;

import java.util.ArrayList;

/**
 * Created by david on 07/10/2016.
 */
public class GeneralGameState {
    public ArrayList<BasicPlayerInfo> gamePlayers = new ArrayList<>();
    public String currentPlayer;

    public static GeneralGameState createFromGame(Game game) {
        GeneralGameState state = new GeneralGameState();
        for (Player player : game.getPlayers()) {
            state.gamePlayers.add(BasicPlayerInfo.fromPlayer(player));
        }
        state.currentPlayer = game.currentPlayer().name;
        return state;
    }

    private static class BasicPlayerInfo {
        public String name;
        public String type;
        public int score;

        public static BasicPlayerInfo fromPlayer(Player player) {
            BasicPlayerInfo info = new BasicPlayerInfo();
            info.name = player.name;
            info.type = player instanceof ComputerPlayer ? Constants.AI_TYPE : Constants.HUMAN_TYPE;
            info.score = player.getStatistics().score;
            return info;
        }

        private BasicPlayerInfo() {
        }

    }
}
