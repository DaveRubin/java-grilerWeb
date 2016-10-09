package gridlerServer.logic;

import core.controllers.Game;
import core.controllers.player.ComputerPlayer;
import core.controllers.player.Player;
import core.model.GameSettings;
import gridlerServer.models.GameLobbyItem;
import gridlerServer.models.PlayerDefinition;
import gridlerServer.servlets.UploadGameFile;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import static gridlerServer.Constants.AI_TYPE;
import static gridlerServer.Constants.HUMAN_TYPE;

/**
 * @author blecherl
 */
public class GameManager {
    private final List<Game> games;

    public final Lock addingLock = new ReentrantLock();

    public GameManager() {
        games = new ArrayList<>();
    }

    public void addGame(Game gameToAdd) {
        addingLock.lock();
        games.add(gameToAdd);
        addingLock.unlock();
    }

    public List<Game> getGames() {
        return games;
    }

    public ArrayList<GameLobbyItem> getGameItemRooms() throws InterruptedException {
        ArrayList<GameLobbyItem> gameLobbyItems = new ArrayList<>();

        for (Game game : games) {

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

            gameLobbyItems.add(new GameLobbyItem(title, totalPlayers, def, createdBy, dimensions));

        }
        return gameLobbyItems;
    }

    public Game getGame(String roomName, String roomCreatedBy) {
        for (Game game : games) {
            GameSettings settings = game.getSettings();
            if (Objects.equals(game.createdBy, roomCreatedBy) &&
                    Objects.equals(settings.gametitle, roomName)) {
                return game;
            }
        }

        return null;
    }
}