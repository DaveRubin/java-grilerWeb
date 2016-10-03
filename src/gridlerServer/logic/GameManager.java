package gridlerServer.logic;

import core.controllers.Game;
import core.controllers.player.ComputerPlayer;
import core.controllers.player.Player;
import core.model.GameSettings;
import gridlerServer.models.GameLobbyItem;
import gridlerServer.models.PlayerDefinition;

import java.util.ArrayList;
import java.util.List;

/**
 * @author blecherl
 */
public class GameManager {
    private final List<Game> games;


    public GameManager() {
        games = new ArrayList<>();
    }

    public void addGame(Game gameToAdd) {
        games.add(gameToAdd);
    }

    public List<Game> getGames() {
        return games;
    }

    public ArrayList<GameLobbyItem> getGameItemRooms() {
        ArrayList<GameLobbyItem> gameLobbyItems = new ArrayList<>();

        for (Game game : games) {

            GameSettings settings = game.getSettings();
            ArrayList<PlayerDefinition> def = new ArrayList<>();

            for (Player player : game.getPlayers()) {
                String type = player instanceof ComputerPlayer ? "AI" : "Human";
                def.add(new PlayerDefinition(player.name, type));
            }

            gameLobbyItems.add(new GameLobbyItem(settings.gametitle, settings.totalPlayers, def, game.createdBy, settings.dimensions));
        }
        return gameLobbyItems;
    }
}