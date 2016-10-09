package gridlerServer.models;

import java.awt.*;
import java.util.ArrayList;

/**
 * Created by david on 29/09/2016.
 */
public class GameLobbyItem {
    public String name;
    public int size;
    public ArrayList<PlayerDefinition> players;
    public String createdBy;
    public Point boardSize;
    public int id;

    public GameLobbyItem(String name,
                         int size,
                         ArrayList<PlayerDefinition> players,
                         String createdBy,
                         Point boardSize,
                         int id) {
        this.name = name;
        this.size = size;
        this.players = players;
        this.createdBy = createdBy;
        this.boardSize = boardSize;
        this.id = id;
    }
}
