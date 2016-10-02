package gridlerServer.logic;

import gridlerServer.models.User;

import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * @author blecherl
 */
public class UserManager {

    private final Set<User> usersSet;

    public UserManager() {
        usersSet = new HashSet<>();
    }

    public void addUser(User user) {
        usersSet.add(user);
    }

    public void removeUser(User user) {
        for (User user1 : usersSet) {
            if (Objects.equals(user1.name, user.name)) {
                usersSet.remove(user1);
                break;
            }
        }
    }

    public Set<User> getUsers() {
        return Collections.unmodifiableSet(usersSet);
    }

    public boolean isUserExists(User user) {
        boolean contains = false;
        for (User user1 : usersSet) {
            if (Objects.equals(user1.name, user.name))
            {
                contains = true;
                break;
            }
        }
        return contains;
    }
}
