package gridlerServer.models;

import java.awt.*;
import java.util.ArrayList;

/**
 * Created by david on 29/09/2016.
 */
public class GameLobbyItem {
    String name;
    int size;
    ArrayList<PlayerDefinition> players;
    String createdBy;
    Point boardSize;

    public GameLobbyItem(String name,
                         int size,
                         ArrayList<PlayerDefinition> players,
                         String createdBy,
                         Point boardSize) {
        this.name = name;
        this.size = size;
        this.players = players;
        this.createdBy = createdBy;
        this.boardSize = boardSize;
    }
}
