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

    private final HashMap<Integer,Game> gameHashMap;

    public final Lock addingLock = new ReentrantLock();
    private static int id = 0;

    public GameManager() {
        gameHashMap = new HashMap<>();
    }

    public void addGame(Game gameToAdd) {
        addingLock.lock();
        gameHashMap.put(id,gameToAdd);
        id++;
        addingLock.unlock();
    }

    public ArrayList<GameLobbyItem> getGameItemRooms() throws InterruptedException {
        ArrayList<GameLobbyItem> gameLobbyItems = new ArrayList<>();

        for (Map.Entry<Integer, Game> integerGameEntry : gameHashMap.entrySet()) {
            Game game = integerGameEntry.getValue();
            GameSettings settings = game.getSettings();
            ArrayList<PlayerDefinition> def = new ArrayList<>();

            for (Player player : game.getPlayers()) {
                String type = player instanceof ComputerPlayer ? AI_TYPE : HUMAN_TYPE;
                def.add(new PlayerDefinition(player.name, type));
            }

            String title = settings.gametitle;
            int totalPlayers = settings.totalPlayers;
            Point dimensions = settings.dimensions;
            String createdBy = game.createdBy;

            gameLobbyItems.add(new GameLobbyItem(title, totalPlayers, def, createdBy, dimensions,integerGameEntry.getKey()));

        }

//        for (Game game : games) {
//
//        }
        return gameLobbyItems;
    }

    /**
     * Get game by its id
     * @param id
     * @return
     */
    public Game getGame(int id) {
        return gameHashMap.getOrDefault(id,null);
    }

    /**
     *  get game from a room id
     * @param roomId
     * @return
     */
    public Game getGame(String roomId) {
        return getGame(Integer.parseInt(roomId));
    }
}