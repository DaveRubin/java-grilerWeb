package gridlerServer.logic;

import core.controllers.Game;

import java.util.ArrayList;
import java.util.List;

/**
 *
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

    public void addChatString(String chatString, String username) {
        //games.add(new ChatEntry(chatString, username));
    }

    public List<Object> getChatEntries(int fromIndex){
//        if (fromIndex < 0 || fromIndex >= chatDataList.size()) {
//            fromIndex = 0;
//        }
//        return chatDataList.subList(fromIndex, chatDataList.size());
        return null;
    }
}