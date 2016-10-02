package gridlerServer.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by david on 29/09/2016.
 */
public class MainLobbyResponse {
    public Set<User> users = new HashSet<>();
    public ArrayList<GameLobbyItem> games = new ArrayList<>();
}
