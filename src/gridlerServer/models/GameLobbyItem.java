package gridlerServer.models;

import core.model.GameSettings;

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
    public GameSettings settings;
}
