package gridlerServer.logic;

import core.controllers.Game;
import core.controllers.player.ComputerPlayer;
import core.controllers.player.Player;
import core.model.GameSettings;
import gridlerServer.models.GameLobbyItem;
import gridlerServer.models.PlayerDefinition;
import gridlerServer.servlets.UploadGameFile;

import java.awt.*;
import java.util.*;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import static gridlerServer.Constants.AI_TYPE;
import static gridlerServer.Constants.HUMAN_TYPE;

/**
 * @author blecherl
 */
public class GameManager {

    private final HashMap<String,Game> gameHashMap;

    public final Lock addingLock = new ReentrantLock();

    public GameManager() {
        gameHashMap = new HashMap<>();
    }

    public void addGame(Game gameToAdd) throws Exception {
        String gameName = gameToAdd.getSettings().gametitle;
        if (gameHashMap.containsKey(gameName))
            throw new Exception("Game named " + gameName + " already exists.");

        addingLock.lock();
        gameHashMap.put(gameToAdd.getSettings().gametitle,gameToAdd);
        addingLock.unlock();
    }

    public ArrayList<GameLobbyItem> getGameItemRooms() throws InterruptedException {
        ArrayList<GameLobbyItem> gameLobbyItems = new ArrayList<>();

        for (Map.Entry<String, Game> integerGameEntry : gameHashMap.entrySet()) {
            Game game = integerGameEntry.getValue();
            GameSettings settings = game.getSettings();
            ArrayList<PlayerDefinition> players = new ArrayList<>();

            for (Player player : game.getPlayers()) {
                String type = player instanceof ComputerPlayer ? AI_TYPE : HUMAN_TYPE;
                players.add(new PlayerDefinition(player.name, type));
            }
            GameLobbyItem item = new GameLobbyItem();

            item.name = settings.gametitle;
            item.size = settings.totalPlayers;
            item.boardSize = settings.dimensions;
            item.createdBy = game.createdBy;
            item.players = players;
            item.settings = game.getSettings();

            gameLobbyItems.add(item);

        }
        return gameLobbyItems;
    }

    /**
     *  get game from a room id
     * @param roomName
     * @return
     */
    public Game getGame(String roomName) {
        return gameHashMap.getOrDefault(roomName,null);
    }
}